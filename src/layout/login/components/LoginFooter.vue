<template>
    <div class="flex justify-center">
        <Button label="Ingresar" icon="pi pi-sign-in" class="w-2xs" v-if="!isLoading" @click="onLogin" outlined
            rounded />
        <Button class="w-2xs" v-else disabled outlined rounded>
            <ProgressSpinner id="spinner" />
        </Button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isLoading: boolean;
    onLogin: () => void;
}>();
</script>