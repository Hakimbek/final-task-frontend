import { UserDto } from "./User.dto.ts";
import { QuestionDto } from "./Question.dto.ts";

export interface TemplateDto {
    id: string;
    title: string;
    description: string;
    topic: string;
    user: UserDto;
    questions: QuestionDto[];
    tags: string[];
}

export interface CreateTemplateDto {
    title: string;
    description: string;
    topic: string;
    tags: string[];
}

export interface EditTemplateDto {
    id: string;
    title: string;
    description: string;
    topic: string;
    tags: string[];
}
