<template>

    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Búsqueda/Registro Paquete</template>
        <template #content>
            <div class="grid grid-cols-5 gap-3 my-6">
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idPaquete" id="idPaquete" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idPaquete">Id Paquete </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText id="paquete" v-model="form.paquete" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="paquete">Paquete</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.refacciones" id="refacciones" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="refacciones">Refacciones</label>
                </FloatLabel>

                
            </div>
          
        </template>
        <template #footer>
            <div class="flex justify-evenly" style="margin-top: 2rem;">
                <Button severity="Success" label="Buscar Paquete" icon="pi pi-search" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="contrast" label="Registrar Paquete" icon="pi pi-save" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="info" label="Limpiar Formulario" icon="pi pi-undo" iconPos="right" size="small"
                    @click="onClear" />
            </div>

        </template>

    </card>






</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from "primevue";
import { useForm } from '@/utils/forms/composables/useForm';
import Catalogos from "@/modules/catalogos/Composables/PaquetesTable.vue";
import PaquetesTable from '@/modules/catalogos/Composables/PaquetesTable.vue';
import type { Cat } from '../interfaces/Catalogos.interface';
const { items, search, states } = useForm();
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