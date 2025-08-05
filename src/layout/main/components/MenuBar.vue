<template>
    <Menubar :model="items">
        <template #start>
            <Button icon="pi pi-bars" @click="emit('visibility', !visible)" severity="contrast" />
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex items-center" v-bind="props.action">
                <span>{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                        item.shortcut }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
            </a>
        </template>
        <template #end>
            <div class="flex items-center gap-2">
                <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                <Avatar id="avatar" :label="avatarLabel" shape="circle" />
            </div>
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import type { MenuItem } from '../interfaces';

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