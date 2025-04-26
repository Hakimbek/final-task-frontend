export interface LoginDto {
    email: string;
    password: string;
}

export interface SignupDto extends LoginDto {
    firstname: string;
    lastname: string;
}

export interface CredentialsDto {
    token: string;
    userId: string;
}
