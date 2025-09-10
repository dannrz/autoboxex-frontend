<template>
    <div class="grid grid-cols-2 gap-5 my-5">
        <InsertClientCard />
        <Insumos/>
        <FactList/>
        <PreciosList/>
        <Card class="w-full col-span-2">
            <template #title>Clientes registrados</template>
            <template #content></template>
            <template #footer>
                <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel" iconPos="right" size="small" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import FactList from "../components/FactList.vue";
import InsertClientCard from "../components/InsertClientCard.vue";
import Insumos from "../components/Insumos.vue";
import PreciosList from "../components/PreciosList.vue";

</script>