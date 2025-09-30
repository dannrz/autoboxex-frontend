import type { User } from "@/layout/login/interfaces"
import type { PasswordRequest } from "@/modules/user/interfaces";
import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
        passwordRequests: [] as Array<PasswordRequest>,
    })
});