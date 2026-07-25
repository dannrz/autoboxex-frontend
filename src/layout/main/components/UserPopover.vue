<template>
    <Card unstyled>
        <template #header>
            <div class="flex justify-center">
                <Avatar id="avatar" :label="label" shape="circle" />
            </div>
        </template>
        <template #content>
            <h1 class="text-lg font-bold text-center">{{ name }}</h1>
            <h4 class="text-sm text-center text-gray-600">{{ role.description }}</h4>
        </template>
        <template #footer>
            <div class="flex gap-4">
                <Button severity="info" label="Editar perfil" icon="pi pi-user" @click="profile" text />
                <Button v-if="!load" severity="danger" label="Cerrar sesión" icon="pi pi-sign-out" @click="closeSession"
                    text raised />
                <Button severity="danger" v-else disabled outlined>
                    <ProgressSpinner id="spinner" />
                </Button>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { User } from '@/layout/login/interfaces';
import router from '@/router';

defineProps<{
    label?: string;
    closeSession: () => void;
    load: boolean;
}>();

const { name, role, username }: User = JSON.parse(localStorage.getItem('user') || '{}');

const profile = (): void => {
    router.push({ name: 'profile', params: { user: username } })
}


</script>