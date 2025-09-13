export interface LoginResponse {
    user: User;
    access_token: string;
    token_type: string;
    expires_at: Date;
}

export interface User {
    id?: number;
    name: string;
    email: string;
    username: string;
    status?: number;
    role: Role;
    password_restores?: PasswordRestores;
}

export interface Role {
    role_name: string;
    description: string;
}

export interface PasswordRestores {
    user_id: number;
}