<template>

    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Consulta de servicio por placa</template>
        <template #content>
            <div class="grid grid-cols-5 gap-3 my-6">
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.idPaquete" id="idPaquete" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idPaquete">Placa </label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <InputText id="paquete" v-model="form.paquete" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="paquete">Cliente</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.refacciones" id="refacciones" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="refacciones">Modelo</label>
                </FloatLabel>
                <FloatLabel variant="on" class="w-full">
                    <AutoComplete v-model="form.refacciones" id="refacciones" 
                        size="small" />
                    <label for="refacciones">Año</label>
                </FloatLabel>

                
            </div>
          
        </template>
        <template #footer>
            <div class="flex justify-evenly" style="margin-top: 2rem;">
                <Button severity="Success" label="Buscar Placa" icon="pi pi-search" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="info" label="Limpiar Formulario" icon="pi pi-undo" iconPos="right" size="small"
                    @click="onClear" />
            </div>

        </template>

    </card>

<p class="m-0">
        <ServiciosTable :Cat="Consultas" />
    </p>




</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from "primevue";
import { useForm } from '@/utils/forms/composables/useForm';
import type { Consultas } from '../interfaces/Consultas.interface';
import ServiciosTable from '../composables/ServiciosTable.vue';
const { items, search, states } = useForm();
const toast = useToast();

const form = ref<Consultas>({} as Consultas);

const onSubmit = (): void => {
    console.log(form.value);
}

const onClear = (): void => {
    form.value = {} as Cat;
    toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
}



</script>