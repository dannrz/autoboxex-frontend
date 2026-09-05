<template>
    <div class="flex justify-end">
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" :placeholder="placeholder" />
        </IconField>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    filters: any,
    placeholder?: string,
}>(), {
    placeholder: 'Buscar...',
});
</script>
