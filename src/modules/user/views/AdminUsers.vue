<template>
    <SkeletonTable v-if="allUsers.length === 0" :headers="['#', 'Nombre', 'Username', 'Rol', 'Acciones']" :rows="3" />

    <DataTable v-else :value="allUsers" stripedRows tableStyle="min-width: 50rem">
        <Column field="id" header="#" style="width: 2rem;"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="username" header="Username"></Column>
        <Column field="role.description" header="Rol"></Column>
        <Column header="Acciones">
            <template #body="{ data }">
                <div class="flex gap-4">
                    <Button icon="pi pi-user-edit" v-tooltip.top="{
                        value: `Editar información de ${data.name}`,
                    }" severity="contrast" outlined rounded />
                    <Button icon="pi pi-power-off" v-tooltip.bottom="{
                        value: tooltipMessage(data),
                    }" :severity="data.status == 1 ? 'success' : 'danger'" :disabled="disableRules(data)" outlined
                        @click="handleStatusChange(data)" rounded />
                </div>
            </template>
        </Column>
        <template #empty>Sin usuarios registrados</template>
    </DataTable>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUser } from '@/layout/main/composables/useUser';
import SkeletonTable from '../components/SkeletonTable.vue';

const { allUsers, getAllUsers, handleStatusChange, tooltipMessage, disableRules } = useUser();

onMounted(() => {
    getAllUsers();
});
</script>