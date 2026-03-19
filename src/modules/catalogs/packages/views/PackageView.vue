<template>
    <h1 class="text-2xl text-center text-cyan-600">
        Paquetes
    </h1>
    <PackagesTable :packages :isLoadingPackages />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { PackagesTable } from '../components';
import { usePackage } from '../composables/usePackage';

const { initData, packages, isLoadingPackages } = usePackage();

onMounted(() => {
    initData();
});
</script>