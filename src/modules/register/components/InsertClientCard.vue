<template>
    <Card>
        <template #title>Datos del Cliente y Auto</template>
        <template #content>
            <div class="grid grid-cols-4 gap-4 my-6">
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                    <label for="idCliente">Id Cliente </label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="cliente" v-model="form.cliente" size="small" class="w-full" />
                    <label for="cliente">Cliente</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.placas" id="placas" :suggestions="items" @complete="search"
                        class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                    <label for="placas">Placas</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.marca" id="marca" :suggestions="items" @complete="search" class="w-full"
                        :inputStyle="{ width: '100%' }" size="small" />
                    <label for="marca">Marca</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.modelo" id="modelo" :suggestions="items" @complete="search"
                        class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                    <label for="modelo">Modelo</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.ordenEntrada" id="entradaOrden" :suggestions="items" @complete="search"
                        class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                    <label for="entradaOrden">Orden entrada</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText type="number" id="year" v-model="form.year" class="w-full" size="small" />
                    <label for="year">Año</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.color" id="color" :suggestions="items" @complete="search" class="w-full"
                        :inputStyle="{ width: '100%' }" size="small" />
                    <label for="color">Color</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="serie" size="small" class="w-full" />
                    <label for="serie">Serie</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="kilometraje" size="small" class="w-full" />
                    <label for="kilometraje">Kilometraje</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.ordenEntrada" id="ordenEntrada" :suggestions="items" @complete="search"
                        class="w-full" :inputStyle="{ width: '100%' }" size="small" />
                    <label for="ordenEntrada">Orden entrada</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Select v-model="form.tipo" id="tipo" :options="lists[0]" optionLabel="name" class="w-full"
                        size="small" />
                    <label for="tipo">Tipo</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <DatePicker v-model="form.fechaEntrada" id="fechaEntrada" showIcon iconDisplay="input"
                        dateFormat="dd/mm/yy" size="small" class="w-full" />
                    <label for="fechaEntrada">Fecha de entrada</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <Select v-model="form.estado" id="estado" :options="lists[1]" optionLabel="name" class="w-full"
                        size="small" />
                    <label for="estado">Estado</label>
                </FloatLabel>
                <FloatLabel variant="on" class="col-span-2">
                    <InputText id="autorizacion" size="small" class="w-full" />
                    <label for="autorizacion">Nombre de quien autoriza</label>
                </FloatLabel>

                <FloatLabel variant="in" class="col-span-2">
                    <Textarea id="observaciones" v-model="form.observaciones" rows="3" cols="105" size="large"
                        autoResize />
                    <label for="observaciones">Observaciones:</label>
                </FloatLabel>
                <FloatLabel variant="in" class="col-span-2">
                    <Textarea id="ingresaPor" v-model="form.ingresaPor" rows="3" cols="105" size="large" autoResize />
                    <label for="ingresaPor">Ingresa por: </label>
                </FloatLabel>
                <FloatLabel variant="on" class="col-span-2">
                    <InputText id="proximoServicio" size="small" class="w-full" />
                    <label for="proximoServicio">Próximo servicio (días)</label>
                </FloatLabel>
                <FloatLabel variant="on" class="col-span-2">
                    <DatePicker v-model="form.fechaSalida" id="fechaSalida" showIcon iconDisplay="input"
                        dateFormat="dd/mm/yy" class="w-full" size="small" />
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
import { ref } from 'vue';
import type { FormRegister, ServiceType } from '../interfaces';
import { useToast } from "primevue";
import { useForm } from '@/utils/forms/composables/useForm';
import { RegisterService } from '../services/registerService';

const { items, search } = useForm();
const { serviceType, states } = RegisterService();
const toast = useToast();

const form = ref<FormRegister>({} as FormRegister);
const lists = ref<Array<ServiceType[]>>([]);

serviceType().then(({ data }): void => {
    lists.value[0] = data;
});

states().then(({ data }): void => {
    lists.value[1] = data;
});

const onSubmit = (): void => {
    console.log(form.value);
}

const onClear = (): void => {
    form.value = {} as FormRegister;
    toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
}
</script>