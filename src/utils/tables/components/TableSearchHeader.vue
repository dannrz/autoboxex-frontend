<template>
    <div v-if="$props.addButton" class="flex justify-between">
        <Button icon="pi pi-plus" severity="info" :label="buttonLabel" text rounded raised
            @click="$emit('dialog', true)" />
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" :placeholder="placeholder" />
        </IconField>
    </div>

    <div v-else class="flex justify-end">
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
    addButton?: boolean,
    buttonLabel?: string,
}>(), {
    placeholder: 'Buscar...',
    addButton: false,
    buttonLabel: 'Agregar',
});

defineEmits<{
    dialog: [value: boolean]
}>();
</script>
