<template>
    <SkeletonTable v-if="skeletonTable" :rows="5" :headers="['#', 'Nombre', 'Username', 'Solicitado', 'Acciones']" />

    <DataTable v-else :value="allUsers" stripedRows tableStyle="min-width: 50rem">
        <Column field="user.id" header="#" style="width: 2rem;"></Column>
        <Column field="user.name" header="Nombre"></Column>
        <Column field="user.username" header="Username"></Column>
        <Column field="requested_at_formatted" header="Solicitado"></Column>
        <Column header="Acciones">
            <template #body="{ data }">
                <div class="flex gap-4">
                    <ConfirmPopup></ConfirmPopup>
                    <Button icon="pi pi-check" v-tooltip.top="{
                        value: `Aceptar cambio de contraseña de ${data.user.name}`,
                    }" @click="confirmRequest($event, data.user_id)" rounded />
                    <Button severity="danger" icon="pi pi-times" v-tooltip.bottom="{
                        value: `Rechazar cambio de contraseña de ${data.user.name}`,
                    }" @click="rejectRequest($event, data.user_id)" outlined rounded />
                </div>
            </template>
        </Column>
        <template #empty>
            <h1 class="text-center">Sin solicitudes de cambio de contraseña</h1>
        </template>
    </DataTable>
</template>

<script setup lang="ts">
import SkeletonTable from '../components/SkeletonTable.vue';
import { usePassword } from '../composables/usePassword';
import { onMounted } from 'vue';

const { allUsers, loadRequests, skeletonTable, confirmRequest, rejectRequest } = usePassword();

onMounted(() => {
    loadRequests();
});
</script>