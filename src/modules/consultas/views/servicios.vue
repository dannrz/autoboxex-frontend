<template>
    <div class="grid grid-cols-1 gap-20">
        <ServiciosFilter />
        <Card>
            <template #title></template>
            <template #content></template>
            <template #footer>
                <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel" iconPos="right" size="small" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">

import ServiciosFilter from "../components/ServiciosFilter.vue";
</script>