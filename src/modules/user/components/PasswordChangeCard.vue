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
                <Button v-if="!isLoading" label="Cambiar contraseña" @click="requireConfirmation(emit)" icon="pi pi-check" />
                <Button v-else disabled outlined class="w-[10rem]">
                    <ProgressSpinner id="spinner" />
                </Button>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Password } from 'primevue';
import type { PasswordInterface } from '../interfaces';
import { usePassword } from '../composables/usePassword';

const emit = defineEmits<{
    (e: 'changePassword', password: PasswordInterface): void;
}>();

const { requireConfirmation, isLoading, pwd } = usePassword();
</script>

<style scoped>
#spinner {
    width: 22px;
    height: 22px;
}
</style>