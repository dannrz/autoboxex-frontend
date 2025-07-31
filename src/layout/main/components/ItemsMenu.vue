<template>
    <div class="card flex justify-center">
        <PanelMenu :model="items" multiple class="w-full md:w-80" />
    </div>
</template>

<script setup lang="ts">
import PanelMenu from 'primevue/panelmenu';
import { useMenu } from "../composables/useMenu";

const { asideItems: items } = useMenu();
</script>
