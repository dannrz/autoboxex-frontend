<template>
    <div class="flex justify-center">
        <Button v-if="!isLoading" label="Solicitar cambio" icon="pi pi-arrow-right-arrow-left" class="w-2xs"
            @click="onRestore" outlined rounded />
        <Button class="w-2xs" v-else disabled outlined rounded>
            <ProgressSpinner id="spinner" />
        </Button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isLoading: boolean;
    onRestore: () => void;
}>();
</script>