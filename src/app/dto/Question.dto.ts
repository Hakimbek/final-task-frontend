export interface QuestionDto {
    id: string;
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    order: number;
}

export interface CreateQuestionDto {
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    templateId: string;
}

export interface EditQuestionDto {
    id: string;
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
}
