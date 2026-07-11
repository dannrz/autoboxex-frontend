<template>
    <div class="flex flex-col justify-content-center place-content-center">
        <Card id="card" class="w-120">
            <template #header>
                <img alt="Autoboxex" class="w-full" src="../../../assets/autoboxex.jpg" />
            </template>
            <template #title>Autoboxex</template>
            <template #subtitle>Admin system</template>
            <template #content>
                <InputFormLogin type="username" v-model:login-form="loginVars"
                    :validation="v.find(v => v.path == 'username')" @enter="onLogin" />
                <InputFormLogin type="password" v-model:login-form="loginVars"
                    :validation="v.find(v => v.path == 'password')" @enter="onLogin" />
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
        <div class="w-120 login">
            <Divider layout="horizontal" align="center" type="dashed">
                <b class="text-gray-400">O si olvidaste tu contraseña</b>
            </Divider>
        </div>
        <div class="w-120 login">
            <Button severity="info" label="Cambiar contraseña" icon="pi pi-sync" class="w-full"
                @click="router.push({ name: 'change-password' })" outlined />
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import InputFormLogin from '../components/InputFormLogin.vue';
import { useLogin } from '../composables/useLogin';
import router from '@/router';

const { loginVars, validateLoginForm: v, onLogin, isLoading } = useLogin();
</script>

<style scoped src="../styles/login.css" />