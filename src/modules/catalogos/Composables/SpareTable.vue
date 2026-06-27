<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="cat" paginator :rows="7" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows
            tableStyle="min-width: 50rem" sort-mode="multiple" removableSort size="large" data-key="id"
            :globalFilterFields="['IdVehículo', 'Placas', 'Modelo', 'Marca', 'Color', 'Año', 'Serie']">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters.global.value" placeholder="Buscar..." />
                    </IconField>
                </div>
            </template>
            <template #empty>Sin resultados</template>
            <template #loading>Por favor espera.</template>
            <Column field="IdVehículo" header="IdVehículo" sortable />
            <Column field="Placas" header="Placas" sortable />
            <Column field="Modelo" header="Modelo" sortable />
            <Column field="Marca" header="Marca" sortable />
            <Column field="Año" header="Año" sortable />
            <Column field="Color" header="Color" sortable />
            <Column field="Serie" header="Serie" sortable />
            
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import type { Catalogos } from '@/modules/catalogos/interfaces/Catalogos.interface';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

defineProps<{
    cat: Catalogos[]
}>();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
</script>