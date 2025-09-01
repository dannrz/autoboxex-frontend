<template>
    <div class="flex flex-col gap-11">
        <UserInfoCard :user="{ name, role, username, email }" />
        <PasswordChangeCard @changePassword="onChangePassword($event)" />
    </div>
    <PasswordDialog />
</template>

<script setup lang="ts">
import type { User } from '@/layout/login/interfaces';
import UserInfoCard from '../components/UserInfoCard.vue';
import PasswordChangeCard from '../components/PasswordChangeCard.vue';
import PasswordDialog from '../components/PasswordDialog.vue';
import { UserService } from '../services/UserService';
import type { PasswordInterface } from '../interfaces';
import type { AxiosError, AxiosResponse } from 'axios';
import { useToast } from 'primevue';
import { useLogin } from '@/layout/login/composables/useLogin';

const { name, role, username, email }: User = JSON.parse(localStorage.getItem('user') || '{}');

const { changePassword } = UserService()
const toast = useToast()
const { onLogout } = useLogin()

const onChangePassword = (pwd: PasswordInterface) => {
    changePassword(pwd)
        .then((res: AxiosResponse) => {
            toast.add({ severity: 'success', summary: 'Cambio realizado correctamente', detail: res.data.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            setTimeout((): void => {
                onLogout();
            }, import.meta.env.VITE_TOAST_LIFETIME);
        })
        .catch((error: AxiosError<{ message: string }>) => {
            toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data.message, life: import.meta.env.VITE_TOAST_LIFETIME });
        });
}
</script>