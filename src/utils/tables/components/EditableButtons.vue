<template>
    <div class="flex gap-4">
        <ConfirmPopup />
        <Button icon="pi pi-pencil" severity="success" rounded @click="$emit('onEditedBrand', $event, data)"
            v-tooltip.top="{
                value: editLabel
            }" />
        <Button icon="pi pi-trash" severity="danger" outlined rounded @click="$emit('onDeletedBrand', $event, data)"
            v-tooltip.bottom="{
                value: deleteLabel
            }" />
    </div>
</template>

<script setup lang="ts">
import type { Brand } from '@/modules/catalogs/brands/interfaces';
import type { ModelResponse } from '@/modules/catalogs/models/interfaces';

defineProps<{
    data: Brand,
    editLabel?: string,
    deleteLabel?: string
}>();

defineEmits<{
    onDeletedBrand: [event: Event, brand: Brand | ModelResponse];
    onEditedBrand: [event: Event, brand: Brand | ModelResponse];
}>();
</script>