export interface QuestionDto {
    id: string;
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    order: number;
    options: string[];
}

export interface CreateQuestionDto {
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    templateId: string;
    options: string[];
}

export interface EditQuestionDto {
    id: string;
    title: string;
    description: string;
    isVisible: boolean;
    type: string;
    options: string[];
}

export interface ReorderDto {
    questionIds: string[];
    templateId: string;
}
