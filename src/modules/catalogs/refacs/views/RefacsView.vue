<template>
    <h1 class="text-emerald-700 text-2xl text-center pb-1.5">
        Refacciones
    </h1>

    <RefacsTable :refacciones :isTableLoading
        @edit="handleEdit" @delete="handleDelete" @create="handleCreate" />

    <RefacDialog v-model="refaccion" :dialog :title="titleDialog" :unidades :tipos :calidades
        :updatePrecioIva :isLoading :create :submit :resolver
        @close="dialog = false" @save="saveData" />

    <ConfirmPopup />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RefacDialog, RefacsTable } from '../components';
import { useRefac } from '../composables/useRefac';

const {
    loadRefacciones,
    refacciones,
    refaccion,
    unidades,
    tipos,
    calidades,
    isLoading,
    isTableLoading,
    handleEdit,
    handleDelete,
    handleCreate,
    showDialog: dialog,
    titleDialog,
    saveData,
    updatePrecioIva,
    submit,
    create,
    resolver,
} = useRefac();

onMounted(() => {
    loadRefacciones();
});
</script>
