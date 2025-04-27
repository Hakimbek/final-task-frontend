import { useGetAnswerByResponseAndQuestionIdQuery } from "../../../app/api/answerApi.ts";
import { useParams } from "react-router-dom";

interface SelectProps {
    questionId: string;
    options: string[];
}

export const Select = ({ questionId, options }: SelectProps) => {
    const { responseId } = useParams();
    const { data } = useGetAnswerByResponseAndQuestionIdQuery({ questionId, responseId }, { skip: !responseId });

    return (
        <div className="d-flex flex-column gap-2">
            {
                options.map((option) => (
                    <label key={option} className="d-flex gap-2">
                        <input
                            defaultChecked={data?.value === option}
                            type="radio"
                            name={questionId}
                            value={option}
                            data-id={questionId}
                            required
                        />
                        {option}
                    </label>
                ))
            }
        </div>
    )
}
