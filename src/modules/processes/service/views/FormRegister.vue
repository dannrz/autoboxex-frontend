<template>
    <div class="grid grid-cols-12 gap-4 my-4">
        <!-- Formulario cliente/vehículo/OT — columna izquierda -->
        <div class="col-span-12 lg:col-span-5">
            <InsertClientCard @insumos="getInsumos($event)" @loader="setLoading($event)" />
        </div>

        <!-- Columna derecha: insumos + tablas -->
        <div class="col-span-12 lg:col-span-7 flex flex-col gap-4">
            <!-- Insumos del servicio seleccionado -->
            <Insumos :refax="insumos" :loading="isLoadingInsumos" />

            <!-- Precios y costos lado a lado -->
            <div class="grid grid-cols-2 gap-4">
                <PreciosList :precios="precios" :loading="preciosLoading" @selection="onEmitedSelection" />
                <FactList :costos="costos" :loading="costosLoading" @clear="clearCostos" />
            </div>
        </div>

        <!-- Footer: acciones globales -->
        <div class="col-span-12">
            <Card>
                <template #title>
                    <span class="text-base font-semibold">Resumen del registro</span>
                </template>
                <template #content>
                    <p class="text-surface-400 text-sm italic">
                        Selecciona un cliente y una orden de entrada para ver el resumen.
                    </p>
                </template>
                <template #footer>
                    <div class="flex justify-end">
                        <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel"
                            iconPos="right" size="small" />
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FactList, InsertClientCard, Insumos, PreciosList } from "../components";
import { useService } from "../composables/useService";
import type { Insumo, Precios } from "../interfaces";
import { useForm } from "@/utils/forms/composables/useForm";

const { precios, costos, preciosLoading, costosLoading, onEmitedSelection, getTables, clearCostos } = useService();
const { isLoadingInsumos } = useForm();
const insumos = ref<Insumo[]>([]);

onMounted(() => {
    getTables();
});

const getInsumos = (e: Insumo[]) => {
    insumos.value = e;
}
const setLoading = (e: boolean) => {
    isLoadingInsumos.value = e;
}
</script>
