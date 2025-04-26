import { useSensor, useSensors, PointerSensor, DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableQuestion } from "./SortableQuestion.tsx";
import { useReorderMutation } from "../../app/api/questionApi.ts";
import { toast } from "react-toastify";
import { QuestionDto } from "../../app/dto/Question.dto.ts";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface SortableQuestionListProps {
    initialQuestions: QuestionDto[];
    templateUserId: string;
}

export const SortableQuestionList = ({
    initialQuestions,
    templateUserId
}: SortableQuestionListProps) => {
    const [questions, setQuestions] = useState(initialQuestions);
    const questionIds: string[] = questions?.map(q => q.id);
    const sensors = useSensors(useSensor(PointerSensor));
    const [reorder] = useReorderMutation();
    const { t } = useTranslation();
    const { templateId = '' } = useParams();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = questions.findIndex(q => q.id === active.id);
            const newIndex = questions.findIndex(q => q.id === over?.id);
            const newOrder = arrayMove(questions, oldIndex, newIndex);
            setQuestions(newOrder);

            reorder({
                templateId,
                questionIds: newOrder.map(q => q.id)
            })
                .unwrap()
                .catch(() => toast(t("error.common")));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={questionIds}
                strategy={verticalListSortingStrategy}
            >
                {questions.map(question => (
                    <SortableQuestion key={question.id} question={question} templateUserId={templateUserId} />
                ))}
            </SortableContext>
        </DndContext>
    );
}
