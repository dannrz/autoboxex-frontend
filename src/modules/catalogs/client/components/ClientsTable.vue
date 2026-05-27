<template>
    <div class="card">
        <SkeletonTable v-if="isLoadingClients" :rows="5"
            :headers="['ID', 'Nombre', 'RFC', 'Sucursal', 'Calle y Núm.', 'Colonia', 'Alcaldía/Municipio', 'Estado', 'Código Postal', 'Telefono', 'Correo Electrónico', 'Crédito', 'Contacto', 'Mano de Obra', 'Descuento']" />
        <DataTable v-else v-model:expandedRows="expandedRows" :value="clients" dataKey="IdCliente" paginator :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]">
            <Column expander style="width: 5rem" />
            <Column field="IdCliente" header="ID" />
            <Column field="Nombre" header="Nombre" />
            <Column field="RFC" header="RFC" />
            <Column field="Sucursal" header="Sucursal" />
            <Column field="Direccion" header="Calle y Núm." />
            <Column field="Colonia" header="Colonia" />
            <Column field="Poblacion" header="Alcaldía/Municipio" />
            <Column field="Estado" header="Estado" />
            <Column field="CP" header="Código Postal" />
            <Column field="Telefono" header="Telefono" />
            <Column field="eMail" header="Correo Electrónico" />
            <Column field="Credito" header="Crédito" />
            <Column field="Contacto" header="Contacto" />
            <Column field="ManoObra" header="Mano de Obra" />
            <Column field="Descuento" header="Descuento" />
            <template #expansion="slotProps">
                <div class="p-4">
                    <h5 class="text-2xl text-center text-teal-500">Vehiculos de {{ slotProps.data.Nombre }}</h5>
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
                            <div class="text-center text-gray-500">
                                No se encontraron vehículos para este cliente.
                            </div>
                        </template>
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Client } from '../interfaces';
import { SkeletonTable } from '@/modules/user/components';

const expandedRows = ref<any[]>([]);

defineProps<{
    clients: Array<Client>,
    isLoadingClients: boolean,
}>();
</script>