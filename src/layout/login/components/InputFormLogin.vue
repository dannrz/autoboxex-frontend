<template>
    <Message v-if="validation?.showMessageError" severity="error" size="small" variant="simple" closable>
        {{ validation?.messageError }}
    </Message>
    <FloatLabel variant="on" style="margin-bottom: 2rem;" v-if="type === 'username'">
        <InputText id="username" class="w-full" v-model="model.username" fluid />
        <label for="username">Usuario</label>
    </FloatLabel>
    <FloatLabel variant="on" v-else>
        <Password type="text" id="password" style="margin-bottom: 2rem;" v-model="model.password" :feedback="false" toggleMask fluid />
        <label for="password">Contraseña</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import Password from 'primevue/password';
import type { LoginUser, ValidateLoginForm } from '../interfaces';

const props = defineProps<{
    type?: 'username' | 'password';
    messageError?: string;
    customClass?: string;
    validation?: ValidateLoginForm;
}>()

const model = defineModel('loginForm', {
    type: Object as () => LoginUser,
    default: { username: '', password: '' }
});
</script>