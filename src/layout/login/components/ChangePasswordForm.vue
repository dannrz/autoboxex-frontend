<template>
    <div class="flex flex-col gap-6 pb-4">
        <FloatLabel variant="on">
            <InputText v-model="restoreData.username" class="w-full" :input-style="{ 'width': '100%' }" />
            <label for="newPassword">Nombre de usuario</label>
        </FloatLabel>
        <FloatLabel variant="on">
            <Password v-model="restoreData.newPassword" class="w-full" :input-style="{ 'width': '100%' }"
                :feedback="false" toggle-mask />
            <label for="newPassword">Nueva contraseña</label>
        </FloatLabel>
        <FloatLabel variant="on">
            <Password v-model="restoreData.confirmPassword" class="w-full" :input-style="{ 'width': '100%' }"
                :feedback="false" toggle-mask />
            <label for="confirmPassword">Confirmar contraseña</label>
        </FloatLabel>
    </div>
</template>

<script setup lang="ts">
import Password from 'primevue/password';
import type { PasswordRestoreRequest } from '../interfaces';

defineProps<{
    restoreData: PasswordRestoreRequest;
}>();
</script>