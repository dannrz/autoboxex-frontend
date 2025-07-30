<template>
    <Toast />
    <Card id="card" class="overflow-hidden mx-auto my-8 w-25rem">
        <template #header>
            <img alt="Autoboxex" class="img-fluid w-full" src="../../../assets/autoboxex.jpg" />
        </template>
        <template #title>Autoboxex</template>
        <template #subtitle>Admin system</template>
        <template #content>
            <InputFormLogin type="username" class="mb-4" v-model:login-form="loginVars"
                :validation="v.find(v => v.path == 'username')" />
            <InputFormLogin type="password" v-model:login-form="loginVars"
                :validation="v.find(v => v.path == 'password')" />
        </template>
        <template #footer>
            <div class="px-8 py-3">
                <Button label="Ingresar" icon="pi pi-user" class="w-full" v-if="!isLoading" @click="onLogin" outlined />
                <Button class="w-full" v-else disabled outlined>
                    <ProgressSpinner id="spinner" />
                </Button>
            </div>
        </template>
    </Card>
    <div class="mx-auto w-25rem">
        <Divider layout="horizontal" align="center" type="dashed"><b class="text-gray-400">O bien</b></Divider>
    </div>
    <RouterLink to="home" class="mx-auto w-25rem flex justify-content-between">
        <Button severity="info" label="Registrate" icon="pi pi-plus" class="w-full" outlined />
    </RouterLink>
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
    margin-top: 10rem !important;
}

#spinner {
    width: 22px;
    height: 22px;
}
</style>