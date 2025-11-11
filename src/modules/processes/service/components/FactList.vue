<template>
    <Card class=" flex flex-wrap items-start">
        <template #title>Tabla de costos</template>
        <template #content>
            <div class="card">
                <DataTable :value="costos" paginator editMode="cell" :pt="tableProps" :rows="5"
                    @cell-edit-complete="onCellEditComplete" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 55rem">
                    <Column field="id" header="Id Producto" />
                    <Column v-for="{ field, header } of editableColumns" :key="field" :field="field" :header="header"
                        style="width: 25%">
                        <template #body="{ data, field }">
                            {{ field === 'precio' || field === 'total' ? formatCurrency(data[field]) : data[field as
                                keyof typeof data] }}
                        </template>
                        <template #editor="{ data, field }">
                            <template v-if="field !== 'precio'">
                                <InputText v-model="data[field]" autofocus fluid />
                            </template>
                            <template v-else>
                                <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US"
                                    autofocus fluid />
                            </template>
                        </template>
                    </Column>
                    <Column field="total" header="Total">
                        <template #body="{ data }">
                            {{ formatCurrency(data.cantidad * data.precio) }}
                        </template>
                    </Column>
                    <template #empty>
                        <h1 class="text-center">
                            No hay datos que mostrar.
                        </h1>
                    </template>
                </DataTable>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import type { Costos } from '../interfaces';
import { useService } from '../composables/useService';

defineProps<{
    costos: Costos[],
    loading: boolean
}>();

const { editableColumns, tableProps, formatCurrency, onCellEditComplete } = useService();
</script>