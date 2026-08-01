<template>
    <div class="flex justify-between">
        <Button label="Agregar modelo" icon="pi pi-plus" severity="info" rounded text @click="onAddModel" />
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters.global.value" placeholder="Buscar marca/modelo..." />
        </IconField>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    onAddModel: () => void,
    filters: any,
}>();
</script>