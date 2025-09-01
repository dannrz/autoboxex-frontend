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
    role: Role;
}

export interface Role {
    role_name: string;
    description: string;
}
