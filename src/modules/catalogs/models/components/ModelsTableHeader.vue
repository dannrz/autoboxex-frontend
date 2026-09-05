<template>
    <div class="flex justify-between">
        <Button label="Agregar modelo" icon="pi pi-plus" severity="info" rounded text @click="onAddModel" />
        <TableSearchHeader :filters="filters" placeholder="Buscar marca/modelo..." />
    </div>
</template>

<script setup lang="ts">
import { TableSearchHeader } from '@table/components';

defineProps<{
    onAddModel: () => void,
    filters: any,
}>();
</script>