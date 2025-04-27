import { UserDto } from "./User.dto.ts";
import { TemplateDto } from "./Template.dto.ts";
import { QuestionDto } from "./Question.dto.ts";

export interface ResponseDto {
    id: string;
    user: UserDto;
    template: TemplateDto;
    answers: {
        id: string;
        value: string;
        question: QuestionDto;
    }[]
}

export interface CreateResponseDto {
    userId: string;
    templateId: string;
    answers: {
        questionId: string;
        answer: string;
    }[]
}

export interface EditResponseDto {
    responseId: string;
    answers: {
        questionId: string;
        answer: string;
    }[]
}