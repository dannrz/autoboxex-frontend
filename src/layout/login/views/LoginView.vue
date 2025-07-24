<template>
    <Card id="card" class="overflow-hidden mx-auto my-8 w-25rem">
        <template #header>
            <img alt="Autoboxex" class="img-fluid w-full" src="../../../assets/autoboxex.jpg" />
        </template>
        <template #title>Autoboxex</template>
        <template #subtitle>Admin system</template>
        <template #content>
            <InputFormLogin type="username" class="mb-4" v-model:login-form="loginVars"
                :validation="validateLoginForm[0]" />
            <InputFormLogin type="password" v-model:login-form="loginVars" :validation="validateLoginForm[1]" />
        </template>
        <template #footer>
            <div class="px-8 py-3">
                <Button type="submit" label="Ingresar" icon="pi pi-user" class="w-full" @click="onLogin" outlined />
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
import { ref, type Ref } from 'vue';
import { z, ZodError } from 'zod';
import Card from 'primevue/card';
import type { ValidateLoginForm, LoginUser } from '../interfaces';
import { loginService } from '../services/login';
import InputFormLogin from '../components/InputFormLogin.vue';

const loginVars: Ref<LoginUser> = ref<LoginUser>({
    username: '',
    password: ''
});

const validateLoginForm: Ref<ValidateLoginForm[]> = ref<Array<ValidateLoginForm>>([
    {
        showMessageError: false,
        messageError: ''
    },
    {
        showMessageError: false,
        messageError: ''
    }
])

const loginSchema = z.object({
    username: z.string().min(1, 'El usuario es requerido'),
    password: z.string().min(1, 'La contraseña es requerida')
});

const onLogin = async (): Promise<void> => {
    loginSchema.parseAsync(loginVars.value)
        .then(async (data) => {
            console.log(data);
            /* const login = await loginService.login(loginVars.value)
            console.log(login) */
        })
        .catch((error: ZodError) => {
            error.issues.forEach(issue => {
                if (issue.path.includes('username')) {
                    validateLoginForm.value[0].messageError = issue.message;
                    validateLoginForm.value[0].showMessageError = true;
                } else if (issue.path.includes('password')) {
                    validateLoginForm.value[1].messageError = issue.message;
                    validateLoginForm.value[1].showMessageError = true;
                }
            });

            setTimeout(() => {
                validateLoginForm.value[0].showMessageError = false;
                validateLoginForm.value[1].showMessageError = false;
            }, 3500);
        });
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
    margin-top: 10rem !important;
}
</style>