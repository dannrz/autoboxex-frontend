<template>
    <div class="card">
        <SkeletonTable v-if="isLoadingPackages" :headers="['ID Paquete', 'ID Refacción', 'Refacción', 'Cantidad']"
            :rows="4" />
        <DataTable v-else v-model:expandedRowGroups="expandedRowGroups" :value="packages" tableStyle="min-width: 50rem"
            expandableRowGroups rowGroupMode="subheader" groupRowsBy="Paquete" sortMode="single" sortField="Paquete"
            :sortOrder="1">
            <template #groupheader="{ data }">
                <span class="font-bold">
                    {{ data.Paquete }}
                </span>
            </template>
            <Column field="Paquete" header="Paquete"></Column>
            <Column field="IdPaquete" header="ID Paquete"></Column>
            <Column field="IdRefaccion" header="ID Refacción"></Column>
            <Column field="refaccion" header="Refacción"></Column>
            <Column field="Cantidad" header="Cantidad"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Package } from '../interfaces';
import { SkeletonTable } from '@/utils/tables/components';

const expandedRowGroups = ref<any[]>([]);

defineProps<{
    packages: Package[],
    isLoadingPackages: boolean,
}>();
</script>