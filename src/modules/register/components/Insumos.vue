<template>
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Tabla de insumos</template>
        <template #content>
            <div class="card">
                <DataTable v-if="loading" :value="new Array(3)">
                    <Column v-for="value in ['Refacción', 'Tipo', 'Cantidad', 'Precio', 'Importe']" :header="value">
                        <template #body>
                            <Skeleton></Skeleton>
                        </template>
                    </Column>
                </DataTable>
                <DataTable v-else :value="refax" tableStyle="min-width: 50rem">
                    <Column field="refaccion" header="Refacción"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="cantidad" header="Cantidad"></Column>
                    <Column field="precio" header="Precio"></Column>
                    <Column field="importe" header="Importe"></Column>
                    <template #empty>
                        <div class="flex justify-center">
                            <span>No hay datos disponibles</span>
                        </div>
                    </template>
                </DataTable>
            </div>
        </template>
        <template #footer>

        </template>
    </card>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import type { Insumos } from '../interfaces';

defineProps<{
    refax: Array<Insumos>
    loading: boolean
}>()
</script>
