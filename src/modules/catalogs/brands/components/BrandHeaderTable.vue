<template>
    <div class="flex justify-between">
        <Button label="Agregar marca" severity="secondary" icon="pi pi-plus" class="mr-2"
            @click="showAddBrandDialog = true" />
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters.global.value" placeholder="Buscar marca..." />
        </IconField>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    filters: any;
}>();

const showAddBrandDialog = defineModel<boolean>('showAddBrandDialog', { required: true });
</script>