import { api } from "@/api/baseApi";
import type { PasswordInterface } from "../interfaces";
import type { User } from "@/layout/login/interfaces";

export const UserService = () => {
    const changePassword = async (password: PasswordInterface) => {
        return await api.put('/user/change-password', password);
    };

    const users = async () => {
        return await api.get<User[]>('/user/users');
    }

    return {
        changePassword,
        users,
    }
};
