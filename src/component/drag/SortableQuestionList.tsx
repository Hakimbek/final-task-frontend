import { useSensor, useSensors, PointerSensor, DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableQuestion } from "./SortableQuestion.tsx";
import { useReorderMutation } from "../../app/api/questionApi.ts";
import { toast } from "react-toastify";

interface SortableQuestionListProps {
    initialQuestions: {
        id: string;
        title: string;
        description: string;
        isVisible: boolean;
        type: string;
        templateId: string;
        answer: string;
        order: number;
    }[];
    templateUserId: string;
}

export const SortableQuestionList = ({ initialQuestions, templateUserId }: SortableQuestionListProps) => {
    const [questions, setQuestions] = useState(initialQuestions);
    const questionIds: string[] = questions?.map(q => q.id);
    const sensors = useSensors(useSensor(PointerSensor));
    const [reorder] = useReorderMutation();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = questions.findIndex(q => q.id === active.id);
            const newIndex = questions.findIndex(q => q.id === over?.id);
            const newOrder = arrayMove(questions, oldIndex, newIndex);
            setQuestions(newOrder);

            reorder(newOrder.map(q => q.id))
                .unwrap()
                .catch(result => toast(result.data.message));
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