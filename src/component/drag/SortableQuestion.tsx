import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { QuestionDto } from "../../app/dto/Question.dto.ts";
import { Question } from "../question/Question.tsx";
import { useAuth } from "../../app/hook/useAuth.ts";

interface SortableQuestionProps {
    question: QuestionDto;
    templateUserId: string;
}

export const SortableQuestion = ({
    question,
    templateUserId
}: SortableQuestionProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: question.id || '' });
    const { user } = useAuth();
    const isOwner = user?.id === templateUserId;
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="position-relative"
        >
            {
                isOwner && (
                    <div {...attributes} {...listeners} className="position-absolute" style={{ margin: "50px 0 0 -20px" }}>
                        <i className="bi bi-grip-vertical"></i>
                    </div>
                )
            }
            <Question
                id={question.id || ''}
                title={question.title}
                description={question.description}
                isVisible={question.isVisible}
                type={question.type}
                options={question.options}
                templateUserId={templateUserId}
            />
        </div>
    );
}
