<template>
    <div class="flex justify-between">
        <Button icon="pi pi-plus" severity="info" label="Agregar refacción" text rounded raised @click="$emit('create')" />
        <TableSearchHeader :filters="filters" placeholder="Buscar pieza..." />
    </div>
</template>

<script setup lang="ts">
import { TableSearchHeader } from '@table/components';

defineProps<{
    filters: any,
}>();

defineEmits<{
    create: [],
}>();
</script>