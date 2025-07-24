<template>
    <Message v-if="validation?.showMessageError" severity="error" size="size" variant="simple" closable>
        {{ validation?.messageError }}
    </Message>
    <FloatLabel variant="on" :class="class" v-if="type === 'username'">
        <InputText id="username" class="w-full " v-model="model.username" fluid />
        <label for="username">Usuario</label>
    </FloatLabel>
    <FloatLabel variant="on" :class="class" v-else>
        <InputText id="password" type="password" class="w-full" v-model="model.password" fluid />
        <label for="password">Contraseña</label>
    </FloatLabel>
</template>

<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import type { LoginUser, ValidateLoginForm } from '../interfaces';

defineProps<{
    type?: 'username' | 'password';
    messageError?: string;
    class?: string;
    error?: boolean;
    validation?: ValidateLoginForm;
}>()

const model = defineModel('loginForm', {
    type: Object as () => LoginUser,
    default: { username: '', password: '' }
});
</script>