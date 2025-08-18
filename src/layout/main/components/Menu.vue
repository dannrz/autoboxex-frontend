<template>
    <div class="card">
        <menu-bar :items="items" :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel"
            id="menu" />
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

<style scoped>
#menu {
    list-style-type: none;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 20px;
}
</style>