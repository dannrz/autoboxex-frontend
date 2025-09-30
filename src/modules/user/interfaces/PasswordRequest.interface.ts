import type { User } from "@/layout/login/interfaces";

export interface PasswordRequest {
    requested_at?: string;
    requested_at_formatted?: string;
    user: User;
    user_id: number;
}
