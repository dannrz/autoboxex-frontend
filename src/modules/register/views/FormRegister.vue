<template>
    <div class="grid grid-cols-1 gap-20">
        <InsertClientCard />

        <Card>
            <template #title>Clientes registrados</template>
            <template #content></template>
            <template #footer>
                <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel" iconPos="right" size="small" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import InsertClientCard from "../components/InsertClientCard.vue";
</script>