<template>
    <h1 class="text-shadow-emerald-700 font-bold text-2xl text-center pb-6">
        Clientes
    </h1>

    <ClientsTable :clients :isLoadingClients :filters :columns />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ClientsTable } from '../components';
import { useClient } from '../composables/useClient';
import { useFilter } from '@table/composables';

const { getClients, clients, isLoadingClients, columns } = useClient();
const { filters } = useFilter();

onMounted(() => {
    getClients();
});
</script>