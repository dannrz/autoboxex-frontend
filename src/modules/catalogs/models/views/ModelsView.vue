<template>
    <h1 class="text-shadow-emerald-700 font-bold text-2xl text-center pb-6">
        Catálogo de modelos
    </h1>
    <ModelsTable :models :onAddModel :isLoadingModels @delete="confirm2" @update="confirm3" :filters />

    <AddModelDialog @update:dialog="showAddModelDialog = $event" :dialog="showAddModelDialog" :brands :model :saveData
        :isLoadingSaveModel />
    <ConfirmPopup />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useModels } from '../composables/useModels';
import { AddModelDialog, ModelsTable } from '../components';
import { useFilter } from '@table/composables';

const { filters } = useFilter();
const { initData, models, model, isLoadingModels, isLoadingSaveModel, showAddModelDialog, onAddModel, brands, saveData, confirm2, confirm3 } = useModels();

onMounted(() => {
    initData();
});
</script>