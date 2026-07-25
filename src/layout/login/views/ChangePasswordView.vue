<template>
    <div class="flex flex-col justify-content-center place-content-center">
        <Card id="card" class="w-120">
            <template #header>
                <img alt="Autoboxex" class="w-full" :src="logo" />
            </template>
            <template #title>Autoboxex</template>
            <template #subtitle>Reestablecimiento de contraseña</template>
            <template #content>
                <ChangePasswordForm :restoreData="restoreData" />
            </template>
            <template #footer>
                <ChangePasswordFooter :isLoading="isLoading" :onRestore="onRestore" />
            </template>
        </Card>
        <ChangePasswordLogin />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PasswordRestoreRequest } from '../interfaces';
import { useLogin } from '../composables/useLogin';
import { ChangePasswordForm, ChangePasswordFooter, ChangePasswordLogin } from '../components';
import logo from '@/assets/autoboxex.jpg';

const restoreData = ref<PasswordRestoreRequest>({} as PasswordRestoreRequest);
const { onRestorePassword, isLoading } = useLogin();

const onRestore = async (): Promise<void> => {
    onRestorePassword(restoreData.value).then(() => restoreData.value = {} as PasswordRestoreRequest);
}
</script>

<style src="../styles/login.sass" lang="sass" />