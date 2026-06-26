<template>
    <Card class="w-full">
        <template #title>
            <div class="flex items-center gap-2">
                <i class="pi pi-wrench text-cyan-500" />
                <span>Insumos del servicio</span>
            </div>
        </template>
        <template #content>
            <SkeletonTable v-if="loading" :rows="5" styles="width: 100%"
                :headers="['Refacción', 'Tipo', 'Cantidad', 'Precio', 'Importe']" />
            <DataTable v-else :value="refax" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                size="small" class="w-full">
                <Column field="refaccion.Refacción" header="Refacción" />
                <Column field="tipo" header="Tipo" style="width: 8rem" />
                <Column field="Cantidad" header="Cant." style="width: 6rem" />
                <Column field="PrecioIva" header="Precio" style="width: 8rem">
                    <template #body="{ data }">
                        ${{ Number(data.PrecioIva).toFixed(2) }}
                    </template>
                </Column>
                <Column field="Importe" header="Importe" style="width: 8rem">
                    <template #body="{ data }">
                        ${{ Number(data.Importe).toFixed(2) }}
                    </template>
                </Column>
                <template #empty>
                    <div class="flex flex-col items-center gap-2 py-6 text-surface-400">
                        <i class="pi pi-inbox text-4xl" />
                        <span class="text-sm">Selecciona placas para ver los insumos</span>
                    </div>
                </template>
            </DataTable>
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
