<template>
    <div class="card">
        <menu-bar :items="items" :visible="visible" @visibility="onChangeVisibility($event)" />
        <AsideMenu :visible="visible" @visibility="onChangeVisibility($event)" />
    </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from "vue";
import AsideMenu from "./AsideMenu.vue";
import MenuBar from "./MenuBar.vue";
import { useMenu } from "../composables/useMenu";

const visible: Ref<boolean> = ref(false);

const { items } = useMenu();

const onChangeVisibility = (value: boolean) => {
    visible.value = value;
};
</script>