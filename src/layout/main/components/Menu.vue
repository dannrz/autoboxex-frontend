<template>
    <div>
        <menu-bar :items="items" :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel"
            id="menu" />
        <AsideMenu :visible="visible" @visibility="onChangeVisibility($event)" :avatar-label="avatarLabel"
            :user="user" />
    </div>
    <Dialog v-model:visible="visibleModal" maximizable modal header="Articulos disponibles" :style="{ width: '80rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="m-0">
            <ToolsTable :tools="tools" />
        </p>
    </Dialog>
</template>

<script setup lang="ts">
import { type Ref, ref } from "vue";
import AsideMenu from "./AsideMenu.vue";
import MenuBar from "./MenuBar.vue";
import { useMenu } from "../composables/useMenu";
import { useUser } from "../composables/useUser";
import ToolsTable from "@/modules/tools/components/ToolsTable.vue";

const visible: Ref<boolean> = ref(false);

const { items, visibleModal, tools } = useMenu();
const { avatarLabel, user } = useUser()

const onChangeVisibility = (value: boolean) => {
    visible.value = value;
};
</script>

<style scoped>
#menu {
    list-style-type: none;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 20px;
}
</style>