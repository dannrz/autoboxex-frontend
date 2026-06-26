<template>
    <Card>
        <template #title>
            <div class="flex items-center gap-2">
                <i class="pi pi-car text-cyan-500" />
                <span>Registro de servicio</span>
            </div>
        </template>
        <template #content>
            <div class="grid grid-cols-12 gap-4 items-center my-6">
                <Divider align="center" type="dotted" class="col-span-12">
                    <span class="flex items-center gap-1 text-sm font-semibold text-cyan-600">
                        <i class="pi pi-user" /> Cliente
                    </span>
                </Divider>
                <template v-if="!isLoadingForm">
                    <FloatLabel variant="on" class="col-span-4">
                        <InputText v-model="form.idCliente" id="idCliente" class="w-full" size="small" />
                        <label for="idCliente">Id Cliente</label>
                    </FloatLabel>
                    <ClientAutocomplete
                        v-if="!isLoadingClients"
                        class="col-span-4"
                        :clientes="clientes"
                        v-model="form.cliente"
                        @select="onClientChange"
                    />
                    <Select v-else placeholder="Cargando clientes..." class="col-span-4" loading size="small" />
                    <FloatLabel variant="on" class="col-span-4">
                        <InputText v-model="form.sucursal" id="sucursal" class="w-full" size="small" />
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
                        <Textarea v-model="form.direccion" id="direccion" rows="1" class="w-full" autoResize />
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
                    <span class="flex items-center gap-1 text-sm font-semibold text-cyan-600">
                        <i class="pi pi-car" /> Vehículo
                    </span>
                </Divider>
                <template v-if="!isLoadingForm">
                    <FloatLabel v-if="!isLoadingPlacas" variant="on" class="col-span-4">
                        <AutoComplete
                            v-model="placasQuery"
                            id="placas"
                            :suggestions="placasSuggestions"
                            optionLabel="Placas"
                            :forceSelection="false"
                            class="w-full"
                            :inputStyle="{ width: '100%' }"
                            size="small"
                            @complete="searchPlacas"
                            @option-select="onExistingPlacaSelect"
                        />
                        <label for="placas">Placas</label>
                    </FloatLabel>
                    <div v-else class="col-span-4">
                        <Select placeholder="Cargando placas..." loading size="small" class="w-full" />
                    </div>

                    <FloatLabel variant="on" class="col-span-4">
                        <AutoComplete
                            v-model="form.marca"
                            id="marca"
                            :suggestions="marcaSuggestions"
                            :forceSelection="false"
                            class="w-full"
                            :inputStyle="{ width: '100%' }"
                            size="small"
                            @complete="searchMarca"
                        />
                        <label for="marca">Marca</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-4">
                        <AutoComplete
                            v-model="form.modelo"
                            id="modelo"
                            :suggestions="modeloSuggestions"
                            :forceSelection="false"
                            class="w-full"
                            :inputStyle="{ width: '100%' }"
                            size="small"
                            @complete="searchModelo"
                        />
                        <label for="modelo">Modelo</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText type="number" id="year" v-model="form.year" class="w-full" size="small" />
                        <label for="year">Año</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText v-model="form.color" id="color" class="w-full" size="small" />
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
                    <span class="flex items-center gap-1 text-sm font-semibold text-cyan-600">
                        <i class="pi pi-file-edit" /> Orden de trabajo
                    </span>
                </Divider>
                <FloatLabel v-if="!isLoadingFolios" variant="on" class="col-span-3">
                    <AutoComplete
                        v-model="oeQuery"
                        id="entradaOrden"
                        :suggestions="oeSuggestions"
                        optionLabel="FolioOE"
                        :forceSelection="false"
                        class="w-full"
                        :inputStyle="{ width: '100%' }"
                        size="small"
                        @complete="searchOE"
                        @option-select="onExistingOeSelect"
                        @blur="onOeBlur"
                        @keyup.enter="onOeBlur"
                    />
                    <label for="entradaOrden">Orden entrada</label>
                </FloatLabel>
                <Select v-else placeholder="Cargando folios de entradas..." loading size="small" class="col-span-3" />
                <FloatLabel variant="on" class="col-span-3">
                    <Select v-model="form.tipo" id="tipo" :options="lists[0]" optionLabel="name" class="w-full"
                        size="small" />
                    <label for="tipo">Tipo</label>
                </FloatLabel>
                <FloatLabel variant="on" class="col-span-3">
                    <DatePicker v-model="form.fechaEntrada" id="fechaEntrada" update-model-type="date" showIcon
                        iconDisplay="input" dateFormat="dd/mm/yy" size="small" class="w-full" />
                    <label for="fechaEntrada">Fecha de entrada</label>
                </FloatLabel>

                <FloatLabel variant="on" class="col-span-3">
                    <Select v-model="form.estado" id="estado" :options="lists[1]" optionLabel="name" class="w-full"
                        size="small" />
                    <label for="estado">Estado</label>
                </FloatLabel>
                <FloatLabel variant="on" class="col-span-12">
                    <InputText v-model="form.autorizacion" id="autorizacion" size="small" class="w-full" />
                    <label for="autorizacion">Nombre de quien autoriza</label>
                </FloatLabel>

                <FloatLabel variant="in" class="col-span-6">
                    <Textarea id="observaciones" v-model="form.observaciones" rows="2" class="w-full"
                        autoResize />
                    <label for="observaciones">Observaciones</label>
                </FloatLabel>
                <FloatLabel variant="in" class="col-span-6">
                    <Textarea id="ingresaPor" v-model="form.ingresaPor" rows="2" class="w-full"
                        autoResize />
                    <label for="ingresaPor">Ingresa por</label>
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
import { onMounted, ref, watch } from 'vue';
import { useForm } from '@/utils/forms/composables/useForm';
import type { Insumo } from '../interfaces';
import ClientAutocomplete from './ClientAutocomplete.vue';

const { form, onSubmit, onClear, fetchLists, lists, isLoadingClients, isLoadingPlacas, isLoadingFolios, isLoadingForm, clientes, onClientChange, onPlacasChange, onSelectedFolio, folios, marcas, modelos } = useForm();

const emits = defineEmits<{
    insumos: [value: Insumo[]],
    loader: [value: boolean]
}>()

// Placas: acepta texto libre + sugiere existentes
const placasQuery = ref<string | { Placas: string }>('');
const placasSuggestions = ref<{ Placas: string }[]>([]);

const searchPlacas = (event: { query: string }) => {
    const q = event.query.toLowerCase();
    placasSuggestions.value = (form.value.placasList || [])
        .filter(p => p.Placas?.toLowerCase().includes(q));
};

const onExistingPlacaSelect = (event: { value: { Placas: string } }) => {
    form.value.placas = event.value;
    onPlacasChange(event.value.Placas, emits);
};

// Cuando el usuario escribe una placa nueva (sin seleccionar de la lista),
// guardamos el texto como la placa del vehículo
watch(placasQuery, (val) => {
    if (typeof val === 'string') {
        form.value.placas = { Placas: val };
    }
});

// Sincronizar placasQuery cuando el form se llena desde una OE
watch(() => form.value.placas, (val) => {
    if (val && typeof val === 'object' && 'Placas' in val) {
        placasQuery.value = val;
    }
});

// Marca y Modelo: autocomplete con texto libre
const marcaSuggestions = ref<string[]>([]);
const modeloSuggestions = ref<string[]>([]);

const searchMarca = (event: { query: string }) => {
    const q = event.query.toLowerCase();
    marcaSuggestions.value = marcas.value
        .map(m => m.Marca)
        .filter(m => m.toLowerCase().includes(q));
};

const searchModelo = (event: { query: string }) => {
    const q = event.query.toLowerCase();
    // Si ya hay una marca seleccionada, filtrar modelos de esa marca
    const marcaObj = marcas.value.find(m => m.Marca === form.value.marca);
    const pool = marcaObj
        ? modelos.value.filter(m => m.IdMarca === marcaObj.IdMarca)
        : modelos.value;
    modeloSuggestions.value = [...new Set(pool.map(m => m.Modelo).filter(m => m.toLowerCase().includes(q)))];
};

// Orden de entrada: acepta texto libre + sugiere existentes
const oeQuery = ref<string | { FolioOE: string }>('');
const oeSuggestions = ref<{ FolioOE: string }[]>([]);

const searchOE = (event: { query: string }) => {
    const q = event.query.toLowerCase();
    // Si hay cliente seleccionado, sugerir solo sus folios
    const clientServices = form.value.servicios;
    if (clientServices?.length) {
        oeSuggestions.value = clientServices
            .filter(s => s.FolioOE && String(s.FolioOE).includes(q))
            .map(s => ({ FolioOE: String(s.FolioOE) }));
    } else {
        oeSuggestions.value = [];
    }
};

const onExistingOeSelect = (event: { value: { FolioOE: string } }) => {
    form.value.ordenEntrada = event.value;
    onSelectedFolio(event.value, emits);
};

watch(oeQuery, (val) => {
    if (typeof val === 'string') {
        form.value.ordenEntrada = val || null;
    }
});

// Al salir del campo (blur / Enter), si escribió un folio que existe, carga la info
const onOeBlur = () => {
    const typed = typeof oeQuery.value === 'string'
        ? oeQuery.value.trim()
        : (oeQuery.value as { FolioOE: string })?.FolioOE;

    if (!typed) return;

    const match = folios.value.find(f => f.FolioOE === typed);
    if (match) {
        onSelectedFolio(match, emits);
    }
};

watch(() => form.value.ordenEntrada, (val) => {
    if (val && typeof val === 'object' && 'FolioOE' in val) {
        oeQuery.value = val as { FolioOE: string };
    } else if (!val) {
        oeQuery.value = '';
    }
});

onMounted((): void => {
    fetchLists();
});
</script>