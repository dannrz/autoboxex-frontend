<template>
    <div class="card">
        <menu-bar :items="items" :visible="visible" @visibility="onChangeVisibility($event)"
            :avatar-label="avatarLabel" />
        <AsideMenu :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel"
            :user="user" />
    </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from "vue";
import AsideMenu from "./AsideMenu.vue";
import MenuBar from "./MenuBar.vue";
import { useMenu } from "../composables/useMenu";
import { useUser } from "../composables/useUser";

const visible: Ref<boolean> = ref(false);

const { items } = useMenu();
const { avatarLabel, user } = useUser()

const onChangeVisibility = (value: boolean) => {
    visible.value = value;
};
</script>