<template>
    <Card>
        <template #title>Datos del Cliente y Auto</template>
        <template #content>
            <div class="grid grid-cols-12 gap-4 items-center my-6">
                <Divider align="center" type="dotted" class="col-span-12">
                    <b>Cliente</b>
                </Divider>
                <template v-if="!isLoadingForm">
                    <FloatLabel variant="on" class="col-span-4">
                        <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                            class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                        <label for="idCliente">Id Cliente </label>
                    </FloatLabel>
                    <FloatLabel v-if="!isLoadingClients" variant="on" class="col-span-4">
                        <Select v-model="form.cliente" id="cliente" filter :options="clientes" optionLabel="Nombre"
                            class="w-full" size="small" :virtualScrollerOptions="{ itemSize: 38 }"
                            @value-change="onClientChange" />
                        <label for="cliente">Cliente</label>
                    </FloatLabel>
                    <Select v-else placeholder="Cargando clientes..." class="col-span-4" loading size="small" />
                    <FloatLabel variant="on" class="col-span-4">
                        <AutoComplete v-model="form.sucursal" id="sucursal" :suggestions="items" @complete="search"
                            class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                        <label for="sucursal">Sucursal</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText v-model="form.rfc" id="rfc" class="w-full" size="small" />
                        <label for="rfc">RFC</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText v-model="form.credito" id="credito" class="w-full" size="small" />
                        <label for="credito">Crédito</label>
                    </FloatLabel>
                    <FloatLabel variant="in" class="col-span-6">
                        <Textarea v-model="form.direccion" id="direccion" rows="1" cols="48" size="large" autoResize />
                        <label for="direccion">Dirección</label>
                    </FloatLabel>
                </template>
                <template v-else>
                    <Skeleton class="col-span-4" height="2rem" />
                    <Skeleton class="col-span-4" height="2rem" />
                    <Skeleton class="col-span-4" height="2rem" />
                    <Skeleton class="col-span-3" height="2rem" />
                    <Skeleton class="col-span-3" height="2rem" />
                    <Skeleton class="col-span-6" height="4rem" />
                </template>
                <h4 v-if="form.servicios" class="col-span-12 font-bold">
                    {{ `Total de servicios: ${form.servicios.length}` }}
                </h4>
                <Divider align="center" type="dotted" class="col-span-12">
                    <b class="italic">Vehículo</b>
                </Divider>
                <template v-if="!isLoadingForm">
                    <FloatLabel v-if="!isLoadingPlacas" variant="on" class="col-span-4">
                        <Select v-model="form.placas" id="placas" filter :options="form.placasList" optionLabel="Placas"
                            :virtualScrollerOptions="{ itemSize: 38 }" class="w-full" size="small"
                            @value-change="onPlacasChange($event, emits)" />
                        <label for="placas">Placas</label>
                    </FloatLabel>
                    <Select v-else placeholder="Cargando placas..." class="col-span-4" loading size="small" />

                    <FloatLabel variant="on" class="col-span-4">
                        <InputText v-model="form.marca" id="marca" class="w-full" size="small"
                            :inputStyle="{ width: '100%' }" />
                        <label for="marca">Marca</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-4">
                        <AutoComplete v-model="form.modelo" id="modelo" :suggestions="items" @complete="search"
                            class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                        <label for="modelo">Modelo</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText type="number" id="year" v-model="form.year" class="w-full" size="small" />
                        <label for="year">Año</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <AutoComplete v-model="form.color" id="color" :suggestions="items" @complete="search"
                            class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                        <label for="color">Color</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText v-model="form.serie" id="serie" size="small" class="w-full" />
                        <label for="serie">Serie</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText v-model="form.kilometraje" id="kilometraje" size="small" class="w-full" />
                        <label for="kilometraje">Kilometraje</label>
                    </FloatLabel>
                </template>
                <template v-else>
                    <Skeleton class="col-span-4" height="2rem" />
                    <Skeleton class="col-span-4" height="2rem" />
                    <Skeleton class="col-span-4" height="2rem" />
                    <Skeleton class="col-span-3" height="2rem" />
                    <Skeleton class="col-span-3" height="2rem" />
                    <Skeleton class="col-span-3" height="2rem" />
                    <Skeleton class="col-span-3" height="2rem" />
                </template>
                <Divider align="center" type="dotted" class="col-span-12">
                    <b>Orden de trabajo</b>
                </Divider>
                <FloatLabel v-if="!isLoadingFolios" variant="on" class="col-span-3">
                    <Select v-model="form.ordenEntrada" id="entradaOrden" class="w-full" size="small"
                        optionLabel="FolioOE" filter :options="folios" :virtualScrollerOptions="{ itemSize: 38 }"
                        @value-change="onSelectedFolio($event, emits)" />
                    <label for="entradaOrden">Orden entrada</label>
                </FloatLabel>
                <Select v-else placeholder="Cargando folios de entradas..." loading size="small" class="col-span-3" />
                <FloatLabel v-if="!isLoadingTipos" variant="on" class="col-span-3">
                    <Select v-model="form.tipo" id="tipo" :options="lists[0]" optionLabel="name" class="w-full"
                        size="small" />
                    <label for="tipo">Tipo</label>
                </FloatLabel>
                <Select v-else placeholder="Cargando tipos..." loading size="small" class="col-span-3" />
                <FloatLabel variant="on" class="col-span-3">
                    <DatePicker v-model="form.fechaEntrada" id="fechaEntrada" update-model-type="date" showIcon
                        iconDisplay="input" dateFormat="dd/mm/yy" size="small" class="w-full" />
                    <label for="fechaEntrada">Fecha de entrada</label>
                </FloatLabel>

                <FloatLabel v-if="!isLoadingStates" variant="on" class="col-span-3">
                    <Select v-model="form.estado" id="estado" :options="lists[1]" optionLabel="name" class="w-full"
                        size="small" />
                    <label for="estado">Estado</label>
                </FloatLabel>
                <Select v-else placeholder="Cargando estados..." loading size="small" class="col-span-3" />
                <FloatLabel variant="on" class="col-span-12">
                    <InputText id="autorizacion" size="small" class="w-full" />
                    <label for="autorizacion">Nombre de quien autoriza</label>
                </FloatLabel>

                <FloatLabel variant="in" class="col-span-6">
                    <Textarea id="observaciones" v-model="form.observaciones" rows="2" cols="48" size="large"
                        autoResize />
                    <label for="observaciones">Observaciones:</label>
                </FloatLabel>
                <FloatLabel variant="in" class="col-span-6">
                    <Textarea id="ingresaPor" v-model="form.ingresaPor" rows="2" cols="48" size="large" autoResize />
                    <label for="ingresaPor">Ingresa por: </label>
                </FloatLabel>
                <FloatLabel variant="on" class="col-span-4">
                    <InputText id="proximoServicio" size="small" class="w-full" />
                    <label for="proximoServicio">Próximo servicio (días)</label>
                </FloatLabel>
                <FloatLabel variant="on" class="col-span-4">
                    <DatePicker v-model="form.fechaSalida" update-model-type="date" id="fechaSalida" showIcon
                        iconDisplay="input" dateFormat="dd/mm/yy" class="w-full" size="small"
                        :inputStyle="{ width: '100%' }" />
                    <label for="fechaSalida">Fecha de salida</label>
                </FloatLabel>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-evenly" style="margin-top: 2rem;">
                <Button severity="contrast" label="Insertar vehículo" icon="pi pi-save" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="info" label="Limpiar Formulario" icon="pi pi-undo" iconPos="right" size="small"
                    @click="onClear" />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useForm } from '@/utils/forms/composables/useForm';
import type { Insumo } from '../interfaces';

const { form, items, search, onSubmit, onClear, fetchLists, lists, isLoadingStates, isLoadingTipos, isLoadingClients, isLoadingPlacas, isLoadingFolios, isLoadingForm, clientes, onClientChange, onPlacasChange, onSelectedFolio, folios } = useForm();

onMounted((): void => {
    fetchLists();
});

const emits = defineEmits<{
    insumos: [value: Insumo[]],
    loader: [value: boolean]
}>()
</script>