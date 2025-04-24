import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { QuestionDto } from "../../app/api/questionApi.ts";
import { Question } from "../question/Question.tsx";

interface SortableQuestionProps {
    question: QuestionDto;
    templateUserId: string;
}

export const SortableQuestion = ({ question, templateUserId }: SortableQuestionProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: question.id || '' });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <Question
                id={question.id || ''}
                title={question.title}
                description={question.description}
                isVisible={question.isVisible}
                type={question.type}
                templateUserId={templateUserId}
                answer={question.answer || ''}
            />
        </div>
    );
}