<template>
    <section class="flex flex-col gap-4 pb-4">
        <Message v-for="err in filteredErrors('username')" :key="err.path" severity="error" size="small"
            variant="simple" closable>
            {{ err.messageError }}
        </Message>
        <FloatLabel variant="on">
            <InputText id="username" class="w-full" v-model="model.username" fluid @keyup.enter="$emit('enter')" />
            <label for="username">Usuario</label>
        </FloatLabel>

        <Message v-for="err in filteredErrors('password')" :key="err.path" severity="error" size="small"
            variant="simple" closable>
            {{ err.messageError }}
        </Message>
        <FloatLabel variant="on">
            <Password type="text" id="password" v-model="model.password" :feedback="false" toggleMask fluid
                @keyup.enter="$emit('enter')" />
            <label for="password">Contraseña</label>
        </FloatLabel>
    </section>
</template>

<script setup lang="ts">
import Password from 'primevue/password';
import type { LoginUser, ValidateLoginForm } from '../interfaces';

const model = defineModel<LoginUser>('login', {
    default: () => ({ username: '', password: '' })
});

const props = defineProps<{
    errors: ValidateLoginForm[],
}>();

defineEmits<{
    enter: [];
}>();

const filteredErrors = (type: string) => {
    return props.errors.filter((err) => err.path === type);
}
</script>