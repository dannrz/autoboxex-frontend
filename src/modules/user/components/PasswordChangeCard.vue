<template>
    <Card>
        <template #header>
            <h1 class="text-lg font-extrabold text-center">Cambiar contraseña</h1>
        </template>
        <template #content>
            <div class="grid grid-cols-2 gap-9">
                <FloatLabel variant="on" class="col-span-2">
                    <Password id="password" size="large" class="w-full" :inputStyle="{ width: '100%' }"
                        v-model="pwd.currentPassword" toggleMask :feedback="false" />
                    <label for="password">Contraseña actual</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Password id="password" size="large" class="w-full" :inputStyle="{ width: '100%' }"
                        v-model="pwd.password" toggleMask />
                    <label for="password">Nueva contraseña</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Password id="confirmPassword" size="large" class="w-full" :inputStyle="{ width: '100%' }"
                        v-model="pwd.confirmPassword" toggleMask />
                    <label for="confirmPassword">Confirmar nueva contraseña</label>
                </FloatLabel>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-center pt-[1rem]">
                <Button v-if="!isLoading" label="Cambiar contraseña" @click="requireConfirmation" icon="pi pi-check" />
                <Button v-else disabled outlined class="w-[10rem]">
                    <ProgressSpinner id="spinner" />
                </Button>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Password, useConfirm, useToast } from 'primevue';
import type { PasswordInterface } from '../interfaces';
import { useForm } from '@/utils/forms/composables/useForm';
import type { ZodError } from 'zod';

const emit = defineEmits<{
    (e: 'changePassword', password: PasswordInterface): void;
}>();

const confirm = useConfirm();
const toast = useToast();
const { comparePasswords } = useForm();

const pwd = ref<PasswordInterface>({} as PasswordInterface);
const isLoading = ref<boolean>(false);

const requireConfirmation = (): void => {
    isLoading.value = true;

    comparePasswords(pwd.value)
        .then(() => {
            confirm.require({
                group: 'headless',
                header: '¿Está seguro de cambiar la contraseña?',
                message: 'Sugerimos usar una contraseña fuerte y única. En caso de olvidarla solicite el cambio a su administrador.',
                accept: () => {
                    emit('changePassword', pwd.value);
                },
                reject: () => {
                    toast.add({ severity: 'contrast', summary: 'Cambio cancelado', detail: 'No se realizó el cambio de contraseña', life: import.meta.env.VITE_TOAST_LIFETIME });
                }
            });

            isLoading.value = false;
        })
        .catch((error: ZodError) => {
            error.issues.forEach(issue => {
                toast.add({ severity: 'error', summary: issue.path.join('.'), detail: issue.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            });

            isLoading.value = false;
        });
};
</script>

<style scoped>
#spinner {
    width: 22px;
    height: 22px;
}
</style>