import { TemplateDto } from "./Template.dto.ts";

export interface UserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    image: string;
    templates: TemplateDto[];
}

export interface ImageDto {
    url: string;
    userId: string
}

export interface EditUserDto {
    firstname: string;
    lastname: string;
    userId: string;
}
