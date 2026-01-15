<template>
    <SkeletonTable v-if="isLoadingModels" :rows="5" :headers="['#', 'Marca', 'Modelo', 'Acciones']"
        table-style="min-width: 50rem" />
    <DataTable v-else :value="models" rowGroupMode="rowspan" groupRowsBy="Marca" sortMode="single" sortField="Marca"
        :sortOrder="1" tableStyle="min-width: 50rem" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]">
        <template #header>
            <Button label="Agregar modelo" icon="pi pi-plus" severity="info" rounded outlined @click="onAddModel" />
        </template>
        <Column header="#" headerStyle="width:3rem">
            <template #body="{ index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="Marca" header="Marca" style="min-width: 200px" />
        <Column field="Modelo" header="Modelos" style="min-width: 1000px" />
        <Column header="Acciones">
            <template #body="{ data }">
                <EditableButtons :data="data" :editLabel="`Editar ${data.Modelo}`"
                    :deleteLabel="`Eliminar el modelo: ${data.Modelo}`" @on-deleted-brand="deleted" />
            </template>
        </Column>
    </DataTable>
    <AddModelDialog :dialog="showAddModelDialog" :brands @update:dialog="showAddModelDialog = $event" :saveData />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useModels } from '../composables/useModels';
import { EditableButtons } from '@/utils/tables/components';
import { SkeletonTable } from '@/modules/user/components';
import type { Brand } from '../../brands/interfaces';
import type { ModelResponse } from '../interfaces';
import { AddModelDialog } from '.';

const { initData, models, isLoadingModels, showAddModelDialog, onAddModel, brands, saveData } = useModels();

onMounted(() => {
    initData();
});

const deleted = (event: any, deleted: Brand | ModelResponse): void => {
    console.log(event, deleted)
}
</script>