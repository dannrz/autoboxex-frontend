<template>

    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Datos del Cliente y Auto</template>
        <template #content>
            <div class="grid grid-cols-3 gap-3 my-6">
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Id Cliente </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.cliente" id="cliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="cliente">Cliente </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.placas" id="placas" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="placas">Placas</label>
                </FloatLabel>
                
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.marca" id="marca" :suggestions="items" @complete="search"
                        class="w-full " size="small" />
                    <label for="marca">Marca</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.modelo" id="modelo" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="modelo">Modelo</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.ordenEntrada" id="entradaOrden" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="entradaOrden">Orden entrada</label>
                </FloatLabel>

                <FloatLabel variant="on" class="w-full">
                    <InputText type="number" id="year" v-model="form.year" size="small" />
                    <label for="year">Año</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.color" id="color" :suggestions="items" @complete="search" class="w-full"
                        size="small" />
                    <label for="color">Color</label>
                </FloatLabel>
                  <FloatLabel variant="on">
                    <AutoComplete v-model="form.serie" id="entradaOrden" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="entradaOrden">Serie</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText type="number" id="kilometraje" size="small" />
                    <label for="kilometraje">Kilometraje</label>
                </FloatLabel>
               
                <FloatLabel variant="on">
                    <Select v-model="form.tipo" id="tipo" :options="tipo" optionLabel="name" size="small"
                         class="w-2/3" />
                    <label for="tipo">Tipo</label>
                </FloatLabel>
                 <FloatLabel variant="on" class="w-full">
                    <InputText disabled type="number" id="serie" size="small" />
                    <label for="serie">Folio</label> 
                </FloatLabel>
                <FloatLabel variant="on">
                    <DatePicker v-model="form.fechaEntrada" id="fechaEntrada" showIcon iconDisplay="input"
                        dateFormat="dd/mm/yy" size="small" class="w-2/3" />
                    <label for="fechaEntrada">Fecha de entrada</label>
                </FloatLabel>
                
                <FloatLabel variant="on">
                    <Select v-model="form.estado" id="estado" :options="estado" optionLabel="name" class="w-2/3"
                        size="small" />
                    <label for="estado">Estado</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Select v-model="form.autorizacion" id="estado" :options="autoriza" optionLabel="name"
                        class="w-2/3"size="small" />
                    <label for="estado">Autoriza</label>
                </FloatLabel>
                
                <FloatLabel variant="on" class="w-full">
                    <InputText id="proximoServicio" size="small" />
                    <label for="proximoServicio">Próximo servicio (días)</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <DatePicker v-model="form.fechaSalida" id="fechaSalida" showIcon iconDisplay="input"
                        dateFormat="dd/mm/yy" size="small" class="w-2/3"/>
                    <label for="fechaSalida">Fecha de salida</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.CuentasCobrar" id="ordenEntrada" :suggestions="items" @complete="search"
                    class="w-full" size="small" />
                    <label for="ordenEntrada">F. Cuentas x Cobrar</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.descuento" id="ordenEntrada" :suggestions="items" @complete="search"
                    class="w-full" size="small" />
                    <label for="ordenEntrada">Descuento</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.mano" id="ordenEntrada" :suggestions="items" @complete="search"
                    class="w-full" size="small" />
                    <label for="ordenEntrada">Mano de Obra</label>
                </FloatLabel>
      
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.suma" id="ordenEntrada" :suggestions="items" @complete="search"
                    class="w-full" size="small" />
                    <label for="ordenEntrada">Suma</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.iva" id="ordenEntrada" :suggestions="items" @complete="search"
                    class="w-full" size="small" />
                    <label for="ordenEntrada">Iva</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.total" id="ordenEntrada" :suggestions="items" @complete="search"
                    class="w-full" size="small" />
                    <label for="ordenEntrada">Total</label>
                </FloatLabel>
                <br>
                
                <FloatLabel variant="in" style="width: 50%;">
                    <Textarea id="ingresaPor" v-model="form.DatosFiscales" rows="3"   cols="30" size="large" autoResize />
                    <label for="ingresaPor">Datos fiscales </label>
                </FloatLabel>
                <FloatLabel variant="in" >
                    <Textarea id="observaciones" v-model="form.observaciones" rows="3" cols="30" size="large"
                        autoResize />
                    <label for="observaciones">Observaciones:</label>
                </FloatLabel>
                <FloatLabel variant="in" >
                    <Textarea id="ingresaPor" v-model="form.ingresaPor" rows="3" cols="30" size="large" autoResize />
                    <label for="ingresaPor">Ingresa por: </label>
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
    { name: 'Servicio' },
    { name: 'Presupuesto' },
    { name: 'Factura' },
    { name: 'Remisión' },
    
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