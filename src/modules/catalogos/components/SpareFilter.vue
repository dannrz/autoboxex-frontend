<template>

    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Búsqueda/Registro Refacción</template>
        <template #content>
            <div class="grid grid-cols-5 gap-3 my-6">
                <!-- <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Id Cliente </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText id="cliente" v-model="form.cliente" size="small" />
                    <label for="cliente">Cliente</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.rfc" id="rfc" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="rfc">RFC</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.direccion" id="direccion" :suggestions="items" @complete="search"
                        class="w-full " size="small" />
                    <label for="direccion">Dirección</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.colonia" id="colonia" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="colonia">Colonia</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.zonaMunicipio" id="zonaMunicipio" :suggestions="items" @complete="search"
                        class="w-full" size="small" />
                    <label for="zonaMunicipio">Zona/Municipio</label>
                </FloatLabel>

                <FloatLabel variant="on" class="w-full">
                    <InputText type="number" id="ciudadEstado" v-model="form.ciudadEstado" size="small" />
                    <label for="ciudadEstado">Ciudad/Estado</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.contacto" id="contacto" :suggestions="items" @complete="search" class="w-full"
                        size="small" />
                    <label for="contacto">Contacto</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.telParticular" id="telParticular" :suggestions="items" @complete="search" class="w-full"
                        size="small" />
                    <label for="telParticular">Tel. Particular</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.telMovil" id="telMovil" :suggestions="items" @complete="search" class="w-full"
                        size="small" />
                    <label for="telMovil">Tel. Móvil</label>
                </FloatLabel>
        
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.telOficina" id="telOficina" :suggestions="items" @complete="search" class="w-full"
                        size="small" />
                    <label for="telOficina">Tel. Oficina</label>
                </FloatLabel>
        
              
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.credito" id="credito" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="credito">Crédito </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.descuento" id="descuento" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="descuento">Descuento </label>
                </FloatLabel> -->



            </div>
        </template>
        <template #footer>
            <div class="flex justify-evenly" style="margin-top: 2rem;">
                <Button severity="Success" label="Buscar Cliente" icon="pi pi-search" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="contrast" label="Registrar Cliente" icon="pi pi-save" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="info" label="Limpiar Formulario" icon="pi pi-undo" iconPos="right" size="small"
                    @click="onClear" />
            </div>

        </template>

    </card>


    <p class="m-0">
        <SpareTableTable :Cat="Catalogos" />
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