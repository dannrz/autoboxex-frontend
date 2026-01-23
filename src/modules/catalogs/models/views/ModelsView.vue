<template>
    <h1>Modelos</h1>
    <ModelsTable :models :deleted :onAddModel :isLoadingModels />

    <AddModelDialog @update:dialog="showAddModelDialog = $event" :dialog="showAddModelDialog" :brands :model :saveData
        :isLoadingSaveModel />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useModels } from '../composables/useModels';
import type { Brand } from '../../brands/interfaces';
import type { ModelResponse } from '../interfaces';
import { AddModelDialog, ModelsTable } from '../components';

const { initData, models, model, isLoadingModels, isLoadingSaveModel, showAddModelDialog, onAddModel, brands, saveData } = useModels();

onMounted(() => {
    initData();
});

const deleted = (event: any, deleted: Brand | ModelResponse): void => {
    console.log(deleted)
}
</script>