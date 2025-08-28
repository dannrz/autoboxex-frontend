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
                <h1 class="text-lg font-extrabold text-center">Cambiar contraseña</h1>
                <div class="grid grid-cols-2 gap-9">
                    <FloatLabel variant="on" class="col-span-2">
                        <Password id="password" size="large" class="w-full" :inputStyle="{ width: '100%' }"
                            v-model="pwd.currentPassword" toggleMask :feedback="false" />
                        <label for="password">Contraseña actual</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Password id="password" size="large" class="w-full" :inputStyle="{ width: '100%' }"
                            v-model="pwd.password" toggleMask />
                        <label for="password">Nueva contraseña</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Password id="confirmPassword" size="large" class="w-full" :inputStyle="{ width: '100%' }"
                            v-model="pwd.confirmPassword" toggleMask />
                        <label for="confirmPassword">Confirmar nueva contraseña</label>
                    </FloatLabel>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { User } from '@/layout/login/interfaces';
import { ref } from 'vue';
import type { PasswordInterface } from '../interfaces';
import { Password } from 'primevue';

const { name, role, username, email }: User = JSON.parse(localStorage.getItem('user') || '{}');
const form = ref<User>({
    name: name || '',
    role: role || { id: 0, name: '', description: '' },
    username: username || '',
    email: email || '',
    id: 0
});

const pwd = ref<PasswordInterface>({} as PasswordInterface);
</script>