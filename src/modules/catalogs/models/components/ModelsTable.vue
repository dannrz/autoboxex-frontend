<template>
    <SkeletonTable v-if="isLoadingModels" :rows="5" :headers="['#', 'Marca', 'Modelo', 'Acciones']"
        table-style="min-width: 50rem" />
    <DataTable v-else :value="models" rowGroupMode="rowspan" groupRowsBy="Marca" sortMode="single" sortField="Marca"
        :sortOrder="1" tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]">
        <Column header="#" headerStyle="width:3rem">
            <template #body="{ index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="Marca" header="Marca" style="min-width: 200px" />
        <Column field="Modelo" header="Modelos" style="min-width: 200px" />
        <Column header="Acciones" style="min-width: 200px">
            <template #body="{ data }">
                <EditableButtons :data />
            </template>
        </Column>
    </DataTable>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useModels } from '../composables/useModels';
import { EditableButtons } from '@/utils/tables/components';
import { SkeletonTable } from '@/modules/user/components';

const { models, loadModels, isLoadingModels } = useModels();

onMounted(() => {
    loadModels();
})
</script>