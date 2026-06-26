<template>
    <h1 class="text-2xl text-center text-cyan-600 mb-4">Clientes</h1>

    <ClientsTable
        :clients
        :isLoadingClients
        @new="openDialog(null)"
        @edit="openDialog($event)"
    />

    <ClientFormDialog
        v-model="dialogVisible"
        :client="selectedClient"
        @saved="onSaved"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ClientsTable, ClientFormDialog } from '../components';
import { useClient } from '../composables/useClient';
import type { Client } from '../interfaces';

const { initData, clients, isLoadingClients } = useClient();

const dialogVisible = ref(false);
const selectedClient = ref<Client | null>(null);

const openDialog = (client: Client | null) => {
    selectedClient.value = client;
    dialogVisible.value = true;
};

const onSaved = (client: Client) => {
    const idx = clients.value.findIndex(c => c.IdCliente === client.IdCliente);
    if (idx >= 0) {
        clients.value[idx] = client;
    } else {
        clients.value.unshift(client);
    }
};

onMounted(() => initData());
</script>
