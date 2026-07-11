<template>
    <section class="flex flex-col gap-4 pb-5">
        <Message v-for="err in errors" :key="err.path" severity="error" size="small" variant="simple" closable>
            {{ err.messageError }}
        </Message>
        <FloatLabel variant="on">
            <InputText id="username" class="w-full" v-model="model.username" fluid @keyup.enter="$emit('enter')" />
            <label for="username">Usuario</label>
        </FloatLabel>
        <FloatLabel variant="on">
            <Password type="text" id="password" v-model="model.password" :feedback="false" toggleMask fluid
                @keyup.enter="$emit('enter'); console.log(errors);" />
            <label for="password">Contraseña</label>
        </FloatLabel>
    </section>
</template>

<script setup lang="ts">
import Password from 'primevue/password';
import type { LoginUser, ValidateLoginForm } from '../interfaces';

const model = defineModel('login', {
    type: Object as () => LoginUser,
    default: { username: '', password: '' }
});

defineProps<{
    errors: ValidateLoginForm[],
}>();

defineEmits<{
    enter: [];
}>();
</script>