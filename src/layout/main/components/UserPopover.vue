<template>
    <Card>
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
                <Button severity="info" label="Editar perfil" icon="pi pi-user" @click="profile" />
                <Button v-if="!load" severity="danger" label="Cerrar sesión" icon="pi pi-sign-out"
                    @click="closeSession" />
                <Button severity="danger" v-else disabled outlined>
                    <ProgressSpinner id="spinner" />
                </Button>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { useLogin } from '@/layout/login/composables/useLogin';
import type { User } from '@/layout/login/interfaces';
import router from '@/router';
import { ref } from 'vue';

defineProps<{
    label?: string;
}>();

const { name, role, username }: User = JSON.parse(localStorage.getItem('user') || '{}');
const { onLogout } = useLogin()

const load = ref<boolean>(false);

const profile = (): void => {
    router.push({ name: 'profile', params: { user: username } })
}

const closeSession = (): void => {
    load.value = true;
    onLogout();
}
</script>

<style scoped>
#avatar {
    width: 5rem;
    height: 5rem;
    background-color: #ece9fc;
    color: #2a1261;
}

#spinner {
    width: 22px;
    height: 22px;
    margin: 0 3rem;
}
</style>