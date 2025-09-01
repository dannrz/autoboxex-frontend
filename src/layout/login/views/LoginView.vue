<template>
    <div class="flex flex-col justify-content-center place-content-center">
        <Card id="card" class="w-[30rem]">
            <template #header>
                <img alt="Autoboxex" class="w-full" src="../../../assets/autoboxex.jpg" />
            </template>
            <template #title>Autoboxex</template>
            <template #subtitle>Admin system</template>
            <template #content>
                <InputFormLogin type="username" v-model:login-form="loginVars"
                    :validation="v.find(v => v.path == 'username')" />
                <InputFormLogin type="password" v-model:login-form="loginVars"
                    :validation="v.find(v => v.path == 'password')" />
            </template>
            <template #footer>
                <div class="flex justify-center">
                    <Button label="Ingresar" icon="pi pi-sign-in" class="w-2xs" v-if="!isLoading" @click="onLogin"
                        outlined />
                    <Button class="w-2xs" v-else disabled outlined>
                        <ProgressSpinner id="spinner" />
                    </Button>
                </div>
            </template>
        </Card>
        <div class="w-[30rem] login">
            <Divider layout="horizontal" align="center" type="dashed">
                <b class="text-gray-400">O si olvidaste tu contraseña</b>
            </Divider>
        </div>
        <div class="w-[30rem] login">
            <Button severity="info" label="Cambiar contraseña" icon="pi pi-sync" class="w-full" outlined />
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import InputFormLogin from '../components/InputFormLogin.vue';
import { useLogin } from '../composables/useLogin';

const { loginVars, validateLoginForm: v, onLogin, isLoading } = useLogin();
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