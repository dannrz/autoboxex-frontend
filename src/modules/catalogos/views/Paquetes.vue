<template>
    <div class="grid grid-cols-1 gap-20">
        <Paquetes />
        <Card>
            <template #title>Paquetes</template>
            <template #content>
                  <p class="m-0">
                    <PaquetesTable :Cat="Catalogos" />
                </p>
            </template>
            <template #footer>
                <!-- <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel" iconPos="right" size="small" /> -->
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">

import Paquetes from "../components/PaqueteFilter.vue";


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