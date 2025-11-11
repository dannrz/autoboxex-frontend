<template>
    <Card style="width: fit-content;" class=" flex flex-wrap items-start gap-4">
        <template #title>Tabla de insumos</template>
        <template #content>
            <div class="card">
                <SkeletonTable v-if="loading" :rows="5"
                    :headers="['Refacción', 'Tipo', 'Cantidad', 'Precio', 'Importe']" />
                <DataTable v-else :value="refax" paginator :rows="15" :rowsPerPageOptions="[5, 15, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="refaccion.Refacción" header="Refacción"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="Cantidad" header="Cantidad"></Column>
                    <Column field="PrecioIva" header="Precio"></Column>
                    <Column field="Importe" header="Importe"></Column>
                    <template #empty>
                        <div class="flex justify-center">
                            <span>No hay datos disponibles</span>
                        </div>
                    </template>
                </DataTable>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { SkeletonTable } from '@/modules/user/components';
import type { Insumo } from '../interfaces';

defineProps<{
    refax: Array<Insumo>,
    loading: boolean
}>()
</script>
