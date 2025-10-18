<template>
    <div class="grid grid-cols-2 gap-5 my-5">
        <InsertClientCard @insumos="getInsumos($event)" />
        <Insumos :refax="insumos" :loading="isLoadingInsumos" />
        <FactList :costos="costos" :loading="costosLoading" />
        <PreciosList :precios="precios" :loading="preciosLoading" @selection="onEmitedSelection" />
        <Card class="w-full col-span-2">
            <template #title>Clientes registrados</template>
            <template #content></template>
            <template #footer>
                <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel" iconPos="right"
                    size="small" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FactList, InsertClientCard, Insumos, PreciosList } from "../components";
import { useTables } from "../composables/useTables";
import type { Insumo, Precios } from "../interfaces";
import { useForm } from "@/utils/forms/composables/useForm";

const { precios, costos, preciosLoading, costosLoading, onEmitedSelection, getTables } = useTables();
const { isLoadingInsumos } = useForm();
const insumos = ref<Insumo[]>([]);

onMounted(() => {
    getTables();
});

const getInsumos = (e: Insumo[]) => {
    insumos.value = e;
}
</script>