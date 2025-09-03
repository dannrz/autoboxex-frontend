<template>

    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Cliente</template>
        <template #content>
            <div class="grid grid-cols-5 gap-3 my-6">
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Id Cliente </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText id="cliente" v-model="form.cliente" size="small" />
                    <label for="cliente">Cliente</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.placas" id="placas" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="placas">RFC</label>
                </FloatLabel>
                
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.marca" id="marca" :suggestions="items" @complete="search"
                        class="w-full " size="small" />
                    <label for="marca">Dirección</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.modelo" id="modelo" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="modelo">Colonia</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.ordenEntrada" id="entradaOrden" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="entradaOrden">Zona/Municipio</label>
                </FloatLabel>

                <FloatLabel variant="on" class="w-full">
                    <InputText type="number" id="year" v-model="form.year" size="small" />
                    <label for="year">Ciudad/Estado</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.color" id="color" :suggestions="items" @complete="search" class="w-full"
                        size="small" />
                    <label for="color">Contacto</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText id="serie" size="small" />
                    <label for="serie">Tel. Particular</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText id="kilometraje" size="small" />
                    <label for="kilometraje">Tel. Móvil</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Tel. Oficina </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Crédito </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Descuento </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Mano de obra </label>
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
    </card>






</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormRegister } from '../interfaces';
import { useToast } from "primevue";
import { useForm } from '@/utils/forms/composables/useForm';

const { items, search, serviceType, states } = useForm();
const toast = useToast();

const form = ref<FormRegister>({} as FormRegister);

const onSubmit = (): void => {
    console.log(form.value);
}

const onClear = (): void => {
    form.value = {} as FormRegister;
    toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
}

const tipo = ref([
    { name: 'Mantenimiento' },
    { name: 'Reparación' },
    { name: 'Diagnóstico' },
    { name: 'Inspección' },
    { name: 'Otro' }
]);

const estado = ref([
    { name: 'Autorizado' },
    { name: 'En proceso' },
    { name: 'Cancelado' },
    { name: 'No autorizado' },
    { name: 'Otro' }
]);

const autoriza = ref([
    { name: 'Christian' },
    { name: 'Daniel' },
]);

// const states = [
//     { name: 'En espera' },
//     { name: 'En proceso' },
//     { name: 'Completado' },
//     { name: 'Entregado' },
//     { name: 'Cancelado' }
// ];

</script>