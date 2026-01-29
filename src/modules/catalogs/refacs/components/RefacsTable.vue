<template>
    <DataTable v-model:filters="$props.filters" :value="refacciones" paginator :rows="10"
        :loading="$props.refacciones.length === 0" responsiveLayout="scroll" :rowsPerPageOptions="[10, 20, 50, 100]"
        :globalFilterFields="['Refacción', 'Codigo']">
        <template #header>
            <div class="flex justify-end">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </IconField>
            </div>
        </template>
        <Column field="IdRefaccion" header="ID" />
        <Column field="Refacción" header="Refacción" />
        <Column field="Unidad" header="Unidad" />
        <Column field="Codigo" header="Código" />
        <Column field="Tipo" header="Tipo" />
        <Column field="Cantidad" header="Cantidad" />
        <Column field="Precio" header="Precio" />
        <Column field="Fecha" header="Fecha" />
        <Column field="Marca" header="Marca" />
        <Column field="Calidad" header="Calidad" />
        <Column field="PrecioIva" header="Precio con IVA" />
    </DataTable>
</template>

<script setup lang="ts">
import type { Refaccion } from '../interfaces';

defineProps<{
    refacciones: Array<Refaccion>,
    filters: any,
}>();
</script>