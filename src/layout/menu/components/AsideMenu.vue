<template>
    <div class="card flex justify-center">
        <Drawer :visible="visible" :show-close-icon="false">
            <template #header>
                <div class="flex justify-content-between w-full">
                    <div class="flex items-center gap-2">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                            shape="circle" />
                        <span class="font-bold">Amy Elsner</span>
                    </div>
                    <Button type="button" @click="changeVisibility" icon="pi pi-times" rounded outlined severity="danger" />
                </div>
            </template>
            <ItemsMenu />
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button label="Account" icon="pi pi-user" class="flex-auto" outlined />
                    <RouterLink to="login">
                        <Button label="Logout" icon="pi pi-sign-out" class="flex-auto" severity="danger" text />
                    </RouterLink>
                </div>
            </template>
        </Drawer>
    </div>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import Avatar from 'primevue/avatar';
import ItemsMenu from '@/layout/menu/components/ItemsMenu.vue';

const props = defineProps<{
    visible: boolean | undefined;
}>();

const emits = defineEmits<{
    visibility: [value: boolean]
}>()

const changeVisibility = () => {
    emits('visibility', !props.visible);
}
</script>