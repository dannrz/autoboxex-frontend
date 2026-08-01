<template>
    <div class="flex justify-between">
        <Button icon="pi pi-plus" severity="info" label="Agregar refacción" text rounded raised @click="$emit('create')" />
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar pieza..." />
        </IconField>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    filters: any,
}>();

defineEmits<{
    create: [],
}>();
</script>