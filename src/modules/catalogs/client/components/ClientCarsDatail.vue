<template>
    <div class="flex flex-col gap-4 py-4 px-24">
        <h5 class="text-xl text-teal-500">Vehiculos de {{ nombre }}</h5>
        <DataTable :value="vehiculos">
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

<script setup lang="ts">
import type { Vehiculo } from '../interfaces';

defineProps<{
    nombre: string,
    vehiculos: Array<Vehiculo>,
}>();
</script>
