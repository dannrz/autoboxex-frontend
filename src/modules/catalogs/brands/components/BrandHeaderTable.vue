<template>
    <div class="flex justify-between">
        <Button label="Agregar marca" severity="info" icon="pi pi-plus" class="mr-2" text rounded
            @click="showAddBrandDialog = true" />
        <TableSearchHeader :filters="filters" placeholder="Buscar marca..." />
    </div>
</template>

<script setup lang="ts">
import { TableSearchHeader } from '@table/components';

defineProps<{
    filters: any;
}>();

const showAddBrandDialog = defineModel<boolean>('showAddBrandDialog', { required: true });
</script>