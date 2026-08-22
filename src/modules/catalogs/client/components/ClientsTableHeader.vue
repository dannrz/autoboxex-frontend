<template>
    <div class="flex justify-end">
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Buscar cliente..." />
        </IconField>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    filters: any,
}>();
</script>