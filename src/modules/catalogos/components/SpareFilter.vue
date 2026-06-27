<template>

    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Búsqueda/Registro Refacción</template>
        <template #content>
            <div class="grid grid-cols-5 gap-3 my-6">
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.IdRefaccion" id="IdRefaccion" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="IdRefaccion">Id Refacción </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText id="Ref" v-model="form.Ref" size="small" />
                    <label for="Ref">Ref/Servicio externo</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.Unidad" id="Unidad" :suggestions="items" @complete="search" size="small" />
                    <label for="Unidad">Unidad</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.Codigo" id="Codigo" :suggestions="items" @complete="search"
                        class="w-full " size="small" />
                    <label for="Codigo">Código</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.Tipo" id="Tipo" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="Tipo">Tipo</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.Cantidad" id="Cantidad" :suggestions="items"
                        @complete="search" class="w-full" size="small" />
                    <label for="Cantidad">Cantidad</label>
                </FloatLabel>

                <FloatLabel variant="on" class="w-full">
                    <InputText type="number" id="Precio" v-model="form.Precio" size="small" />
                    <label for="Precio">Precio</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.UltimoReg" id="UltimoReg" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="UltimoReg">Fecha último registro</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.Marca1" id="Marca" :suggestions="items"
                        @complete="search" class="w-full" size="small" />
                    <label for="Marca">Marca</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.Calidad" id="Calidad" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="Calidad">Calidad</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.Iva" id="Iva" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="Iva">Precio IVA</label>
                </FloatLabel>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-evenly" style="margin-top: 2rem;">
                <Button severity="Success" label="Buscar Refacción" icon="pi pi-search" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="contrast" label="Registrar Refacción" icon="pi pi-save" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="info" label="Limpiar Formulario" icon="pi pi-undo" iconPos="right" size="small"
                    @click="onClear" />
            </div>
        </template>
    </card>
       <p class="m-0">
                    <SpareTable :cat="items" />
                </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from "primevue";
import { useForm } from '@/utils/forms/composables/useForm';
import Catalogos from "@/modules/catalogos/Composables/ClientTable.vue";
import ClientTable from '@/modules/catalogos/Composables/ClientTable.vue';
import type { Cat } from '../interfaces/Catalogos.interface';
import SpareTable from '../Composables/SpareTable.vue';
const { items, search, serviceType, states } = useForm();
const toast = useToast();

const form = ref<Cat>({} as Cat);

const onSubmit = (): void => {
    console.log(form.value);
}

const onClear = (): void => {
    form.value = {} as Cat;
    toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
}



</script>