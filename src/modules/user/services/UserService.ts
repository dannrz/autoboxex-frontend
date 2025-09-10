import { api } from "@/api/baseApi";
import type { PasswordInterface, PasswordRequest } from "../interfaces";
import type { User } from "@/layout/login/interfaces";
import type { AxiosResponse } from "axios";
import type { PasswordResponse } from "@/utils/requests/interfaces";

export const UserService = {
    async changePassword(password: PasswordInterface) {
        return await api.put('/user/change-password', password);
    },

    async users() {
        return await api.get<User[]>('/user/users');
    },

    async passwordRequests(): Promise<AxiosResponse<PasswordRequest[]>> {
        return await api.get<PasswordRequest[]>('/user/request-password-changes');
    },

    async respondPasswordRequest(user_id: number, accept: boolean) {
        return await api.patch<PasswordResponse>('/user/respond-password-request', {
            user_id,
            accept
        });
    }
};
