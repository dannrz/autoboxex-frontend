<template>
    <h1 class="text-2xl text-center text-cyan-600">
        Clientes
    </h1>

    <ClientsTable :clients :isLoadingClients />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ClientsTable } from '../components';
import { useClient } from '../composables/useClient';

const { initData, clients, isLoadingClients } = useClient();

onMounted(() => {
    initData();
});
</script>