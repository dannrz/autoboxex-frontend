<template>
    <Card style="width: 25rem; overflow: hidden;" class="mx-auto my-8">
        <template #header>
            <img alt="Autoboxex" class="img-fluid w-full" src="../../../assets/autoboxex.jpg" />
        </template>
        <template #title>Autoboxex</template>
        <template #subtitle>Admin system</template>
        <template #content>
            <FloatLabel variant="on" class="my-4">
                <InputText id="username" class="w-full" v-model="loginVars.username" />
                <label for="username">Usuario</label>
            </FloatLabel>
            <Message v-if="true" severity="error" size="small" variant="simple">
                password incorrecto
            </Message>

            <FloatLabel variant="on">
                <InputText id="password" type="password" class="w-full" v-model="loginVars.password" fluid />
                <label for="password">Contraseña</label>
            </FloatLabel>
        </template>
        <template #footer>
            <div class="px-8 py-3">
                <Button label="Ingresar" icon="pi pi-user" class="w-full" outlined @click="onLogin" />
            </div>
        </template>
    </Card>
    <div style="width: 25rem;" class="mx-auto">
        <Divider layout="horizontal" align="center" type="dashed"><b class="text-gray-400">O bien</b></Divider>
    </div>
    <RouterLink to="home" style="width: 25rem;" class="mx-auto flex justify-content-between">
        <Button severity="info" label="Registrate" icon="pi pi-plus" class="w-full" outlined />
    </RouterLink>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { Form } from '@primevue/forms';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import { loginService } from '../services/login';
import type { LoginUser } from '../interfaces/loginUser.interface';

const loginVars: Ref<LoginUser> = ref<LoginUser>({
    username: '',
    password: ''
});

const resolver = ref(zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required via Zod.' })
    })
));

const onLogin = async (): Promise<void> => {
    if (!loginVars.value.username || !loginVars.value.password) {
        console.warn('Username and password are required');
        return;
    }
    console.log(loginVars.value)
    /* const login = await loginService.login(loginVars.value)

    console.log(login) */
}
</script>

<style>
:root {
    --p-card-color: red;
    --card-border-radius: 25rem;
    --p-card-title-font-size: 1.25rem;
}
</style>