<template>
    <div class="flex flex-col gap-4 py-4 px-24">
        <h5 class="text-xl text-indigo-500 text-center mb-2">Vehiculos de {{ nombre }}</h5>
        <DataTable :value="vehiculos" lazy paginator :rows="rows" :totalRecords="totalRecords"
            :loading="isLoadingVehiculos" @page="onPage">
            <Column field="IdVehiculo" header="ID" />
            <Column field="Placas" header="Placas" />
            <Column field="marca.Marca" header="Marca" />
            <Column field="Modelo" header="Modelo" />
            <Column field="Año" header="Año" />
            <Column field="Color" header="Color" />
            <Column field="VIN" header="VIN" />
            <Column field="Serie" header="Serie" />
            <template #empty>
                <div class="text-center text-gray-500">
                    No se encontraron vehículos para este cliente.
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { DataTablePageEvent } from 'primevue/datatable';
import { useClient } from '../composables/useClient';

const props = defineProps<{
    idCliente: number,
    nombre: string,
}>();

const { getClientVehicles, vehiculos, totalRecords, rows, isLoadingVehiculos } = useClient();

const onPage = (event: DataTablePageEvent): void => {
    rows.value = event.rows;
    getClientVehicles(props.idCliente, event.page + 1);
}

onMounted(() => {
    getClientVehicles(props.idCliente, 1);
});
</script>
