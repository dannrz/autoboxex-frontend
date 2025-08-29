import { api } from "@/api/baseApi";
import type { PasswordInterface } from "../interfaces";

export const UserService = () => {
    const changePassword = async (password: PasswordInterface) => {
        return await api.put('/user/change-password', password);
    };

    return {
        changePassword,
    }
};
