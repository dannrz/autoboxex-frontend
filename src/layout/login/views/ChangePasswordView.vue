<template>
    <div class="flex flex-col justify-content-center place-content-center">
        <Card id="card" class="w-[30rem]">
            <template #header>
                <img alt="Autoboxex" class="w-full" src="../../../assets/autoboxex.jpg" />
            </template>
            <template #title>Autoboxex</template>
            <template #subtitle>Reestablecimiento de contraseña</template>
            <template #content>
                <div class="flex flex-col gap-6">
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
                        <Password v-model="restoreData.confirmPassword" class="w-full"
                            :input-style="{ 'width': '100%' }" :feedback="false" toggle-mask />
                        <label for="confirmPassword">Confirmar contraseña</label>
                    </FloatLabel>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-center">
                    <Button v-if="!isLoading" label="Solicitar cambio" icon="pi pi-arrow-right-arrow-left" class="w-2xs"
                        @click="onRestore" outlined rounded />
                    <Button class="w-2xs" v-else disabled outlined>
                        <ProgressSpinner id="spinner" />
                    </Button>
                </div>
            </template>
        </Card>
        <div class="w-[30rem] login">
            <Divider layout="horizontal" align="center" type="dashed">
                <b class="text-gray-400">O bien</b>
            </Divider>
        </div>
        <div class="w-[30rem] login">
            <Button severity="info" label="Iniciar sesión" icon="pi pi-sign-in" class="w-full"
                @click="router.push({ name: 'login' })" outlined />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Password from 'primevue/password';
import router from '@/router';
import type { PasswordRestoreRequest } from '../interfaces';
import { useLogin } from '../composables/useLogin';

const restoreData = ref<PasswordRestoreRequest>({} as PasswordRestoreRequest);
const { onRestorePassword, isLoading } = useLogin();

const onRestore = async (): Promise<void> => {
    onRestorePassword(restoreData.value).then(() => restoreData.value = {} as PasswordRestoreRequest);
}
</script>

<style scoped>
:root {
    --p-card-color: red;
    --card-border-radius: 25rem;
    --p-card-title-font-size: 1.25rem;
}

#card {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 10rem auto 1rem auto !important;
    overflow: hidden;
}

.login {
    margin: 0 auto !important;
}

#spinner {
    width: 22px;
    height: 22px;
}
</style>