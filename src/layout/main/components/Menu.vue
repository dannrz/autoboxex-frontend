<template>
    <div class="card">
        <menu-bar :items="items" :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel"
            id="menu" />
        <AsideMenu :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel"
            :user="user" />
    </div>
    <Dialog v-model:visible="visibleModal" maximizable modal header="Header" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
        </p>
    </Dialog>
</template>

<script setup lang="ts">
import { type Ref, ref } from "vue";
import AsideMenu from "./AsideMenu.vue";
import MenuBar from "./MenuBar.vue";
import { useMenu } from "../composables/useMenu";
import { useUser } from "../composables/useUser";

const visible: Ref<boolean> = ref(false);

const { items, visibleModal } = useMenu();
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