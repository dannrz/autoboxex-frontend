<template>
    <Card>
        <template #header>
            <h1 class="text-lg font-extrabold text-center">Perfil de Usuario</h1>
        </template>
        <template #content>
            <div class="grid grid-cols-1 gap-9">
                <FloatLabel variant="on">
                    <InputText id="name" size="large" class="w-full" v-model="form.name" />
                    <label for="name">Nombre</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="email" size="large" class="w-full" v-model="form.email" />
                    <label for="email">Email</label>
                </FloatLabel>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-center pt-[1rem]">
                <Button label="Guardar cambios" icon="pi pi-save" />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { User } from '@/layout/login/interfaces';
import { ref } from 'vue';

const props = defineProps<{
    user: User;
}>();

const form = ref<User>({
    name: props.user.name || '',
    role: props.user.role || { id: 0, name: '', description: '' },
    username: props.user.username || '',
    email: props.user.email || '',
    id: 0
});
</script>