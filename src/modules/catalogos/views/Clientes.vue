<template>
    <div class="grid grid-cols-1 gap-20">
        <ClientFilter />
        <Card>
            <template #title>Catálogo de Clientes</template>
            <template #content></template>
            <template #footer>
                <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel" iconPos="right" size="small" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import ClientFilter from "../components/ClientFilter.vue";
// import VehicleFilter from "../components/ClientFilter.vue";




</script>