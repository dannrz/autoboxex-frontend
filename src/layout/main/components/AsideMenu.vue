<template>
    <div class="card flex justify-center">
        <Drawer :visible="visible" :show-close-icon="false">
            <template #header>
                <div class="flex justify-content-between w-full">
                    <div class="flex align-items-center gap-3">
                        <div class="flex align-items-center gap-1">
                            <Avatar :label="avatarLabel" id="avatar" shape="circle" />
                            <span class="font-bold">{{ user?.name }}</span>
                        </div>
                        <span class="text-sm text-gray-500">
                            {{ user?.permission }}
                        </span>
                    </div>
                    <Button type="button" @click="changeVisibility" icon="pi pi-times" severity="danger" rounded
                        outlined />
                </div>
            </template>
            <ItemsMenu />
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button label="Account" icon="pi pi-user" class="flex-auto" outlined />
                    <Button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text
                        @click="onCloseSession" />
                </div>
            </template>
        </Drawer>
    </div>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import Avatar from 'primevue/avatar';
import ItemsMenu from '@/layout/main/components/ItemsMenu.vue';
import { useLogin } from '@/layout/login/composables/useLogin';
import type { User } from '@/layout/login/interfaces';

const { onCloseSession } = useLogin()

const props = defineProps<{
    visible: boolean | undefined;
    avatarLabel?: string;
    user?: User;
}>();

const emits = defineEmits<{
    visibility: [value: boolean]
}>()

const changeVisibility = () => {
    emits('visibility', !props.visible);
}
</script>

<style scoped>
#avatar {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #ece9fc;
    color: #2a1261
}
</style>