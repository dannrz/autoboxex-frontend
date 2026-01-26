<template>
    <h1 class="text-shadow-emerald-700 font-bold text-2xl text-center">Catálogo de modelos</h1>
    <ModelsTable :models :onAddModel :isLoadingModels @delete="confirm2" />

    <AddModelDialog @update:dialog="showAddModelDialog = $event" :dialog="showAddModelDialog" :brands :model :saveData
        :isLoadingSaveModel />
    <ConfirmPopup />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useModels } from '../composables/useModels';
import { AddModelDialog, ModelsTable } from '../components';

const { initData, models, model, isLoadingModels, isLoadingSaveModel, showAddModelDialog, onAddModel, brands, saveData, confirm2 } = useModels();

onMounted(() => {
    initData();
});
</script>