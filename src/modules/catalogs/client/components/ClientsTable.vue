<template>
    <div class="card">
        <SkeletonTable v-if="isLoadingClients" :rows="5"
            :headers="['ID', 'Nombre', 'RFC', 'Sucursal', 'Dirección', 'Colonia', 'Municipio', 'Estado', 'C.P.', 'Teléfono', 'Correo', 'Crédito', 'Contacto', 'M.O.', 'Desc.', '']" />
        <DataTable v-else v-model:expandedRows="expandedRows" v-model:filters="filters"
            :value="clients" dataKey="IdCliente" paginator :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]" :globalFilterFields="['Nombre', 'RFC', 'Sucursal', 'eMail', 'Telefono']">
            <template #header>
                <div class="flex justify-between items-center">
                    <IconField>
                        <InputIcon><i class="pi pi-search" /></InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Buscar cliente..." size="small" />
                    </IconField>
                    <Button label="Nuevo cliente" icon="pi pi-plus" size="small" @click="emits('new')" />
                </div>
            </template>
            <Column expander style="width: 3rem" />
            <Column field="IdCliente" header="ID" style="width: 4rem" />
            <Column field="Nombre" header="Nombre" />
            <Column field="RFC" header="RFC" />
            <Column field="Sucursal" header="Sucursal" />
            <Column field="Direccion" header="Dirección" />
            <Column field="Colonia" header="Colonia" />
            <Column field="Poblacion" header="Municipio" />
            <Column field="Estado" header="Estado" />
            <Column field="CP" header="C.P." />
            <Column field="Telefono" header="Teléfono" />
            <Column field="eMail" header="Correo" />
            <Column field="Credito" header="Crédito" />
            <Column field="Contacto" header="Contacto" />
            <Column field="ManoObra" header="M.O." />
            <Column field="Descuento" header="Desc." />
            <Column header="" style="width: 4rem">
                <template #body="{ data }">
                    <Button icon="pi pi-pencil" text rounded severity="info" size="small"
                        @click="emits('edit', data)" />
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="flex flex-col gap-4 py-4 px-24">
                    <h5 class="text-xl text-teal-500">Vehiculos de {{ slotProps.data.Nombre }}</h5>
                    <DataTable :value="slotProps.data.vehiculos">
                        <Column field="IdVehiculo" header="ID" sortable />
                        <Column field="Placas" header="Placas" sortable />
                        <Column field="marca.Marca" header="Marca" sortable />
                        <Column field="Modelo" header="Modelo" sortable />
                        <Column field="Año" header="Año" sortable />
                        <Column field="Color" header="Color" sortable />
                        <Column field="VIN" header="VIN" sortable />
                        <Column field="Serie" header="Serie" sortable />
                        <template #empty>
                            <div class="text-center text-surface-400">
                                Sin vehículos registrados.
                            </div>
                        </template>
                    </DataTable>
                </div>
            </template>
            <template #empty>
                <div class="text-center text-surface-400 py-4">Sin clientes registrados.</div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import type { Client } from '../interfaces';
import { SkeletonTable } from '@/modules/user/components';

defineProps<{
    clients: Array<Client>;
    isLoadingClients: boolean;
}>();

const emits = defineEmits<{
    new: [];
    edit: [client: Client];
}>();

const expandedRows = ref<any[]>([]);
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
</script>
