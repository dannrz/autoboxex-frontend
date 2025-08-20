<template>
    <Menubar :model="items" id="card">
        <template #start>
            <Button icon="pi pi-bars" @click="emit('visibility', !visible)" severity="contrast" />
        </template>
        <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" active-class="bg-blue-500"
                custom>
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
                <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
            </a>
        </template>
        <template #end>
            <div class="flex align-items-center gap-2">
                <ModeToggler />
                <Avatar id="avatar" :label="avatarLabel" shape="circle" />
            </div>
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import type { MenuItem } from 'primevue/menuitem';
import ModeToggler from './ModeToggler.vue';

defineProps<{
    visible: boolean;
    items: Array<MenuItem>;
    avatarLabel?: string;
}>();

const emit = defineEmits<{
    visibility: [value: boolean]
}>();
</script>

<style scoped>
#avatar {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #ece9fc;
    color: #2a1261;
}
</style>