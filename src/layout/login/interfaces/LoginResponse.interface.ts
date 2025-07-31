export interface LoginResponse {
    user: User;
    access_token: string;
    token_type: string;
    expires_at: Date;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    email_verified_at: null;
    created_at: Date;
    updated_at: Date;
}
