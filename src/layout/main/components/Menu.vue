<template>
    <AsideMenu :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel" :user="user" />
    <MenuBar :items="items" :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel"
        id="menu" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AsideMenu, MenuBar } from '.';
import type { MenuItem } from "primevue/menuitem";
import type { User } from "@/layout/login/interfaces";

const visible = ref<boolean>(false);
const onChangeVisibility = (value: boolean) => {
    visible.value = value;
};

defineProps<{
    items: Array<MenuItem>,
    avatarLabel: string,
    user: User
}>();
</script>