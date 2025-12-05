<template>
    <div class="flex gap-4">
        <ConfirmPopup />
        <Button icon="pi pi-pencil" severity="success" rounded @click="$emit('onEditedBrand', $event, data)"
            v-tooltip.top="{
                value: `Editar ${data.Marca}`
            }" />
        <Button icon="pi pi-trash" severity="danger" outlined rounded @click="$emit('onDeletedBrand', $event, data)"
            v-tooltip.bottom="{
                value: `Eliminar la marca: ${data.Marca}`,
            }" />
    </div>
</template>

<script setup lang="ts">
import type { Brand } from '@/modules/catalogs/brands/interfaces';

defineProps<{
    data: Brand
}>();

defineEmits<{
    onDeletedBrand: [event: Event, brand: Brand];
    onEditedBrand: [event: Event, brand: Brand];
}>();
</script>