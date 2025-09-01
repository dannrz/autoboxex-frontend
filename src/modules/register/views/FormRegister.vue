<template>
<<<<<<< HEAD
    <div class="grid grid-cols-1 gap-20">
        <InsertClientCard />

        <Card>
            <template #title>Clientes registrados</template>
            <template #content></template>
            <template #footer>
                <Button severity="success" label="Descargar Excel" icon="pi pi-file-excel" iconPos="right" size="small" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import InsertClientCard from "../components/InsertClientCard.vue";
=======
   <Card class="mx-3">
        <template #title>Datos del Cliente y Auto</template>
        <template #content>

        </template>
        <template #footer>
            <div class="flex justify-evenly">
                <Button severity="contrast" label="Insertar vehículo" icon="pi pi-save" iconPos="right" size="small"
                    @click="onSubmit" />
                <Button severity="warn" label="Limpiar Formulario" icon="pi pi-undo" iconPos="right" size="small"
                    @click="onClear" />
            </div>
        </template>
    </Card> 
</template>



<script setup lang="ts">


// import { ref } from "vue";
// import type { FormRegister } from "../interfaces";
// import { useToast } from "primevue";
// import Vehiculo from "./vehiculo.vue";
// /*aquí inicia la búsqueda de placas*/

// const form = ref<FormRegister>({} as FormRegister)
// const items = ref<string[]>([]);
// const toast = useToast();

// const search = (event: { query: string }) => {
//     items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
// }
// /*aquí inicia la búsqueda de placas*/
// const nodes = ref();
// const estado = ref([
//     { name: 'Emitida', code: 'EM' },
//     { name: 'Retenida', code: 'RE' },
//     { name: 'Cancelada', code: 'CA' },
//     { name: 'En pausa', code: 'PA' },
//     { name: 'Ausente', code: 'AU' }
// ]);
// const tipo = ref([
//     { name: 'Servicio', code: 'NY' },
//     { name: 'Mantenimiento', code: 'RM' },
//     { name: 'Refacciones', code: 'LDN' },
//     { name: 'Pintura', code: 'IST' },
//     { name: 'Talacha', code: 'PRS' }
// ]);

// const onSubmit = (): void => {
//     console.log(form.value);
// }

// const onClear = (): void => {
//     form.value = {} as FormRegister;
//     toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
// }
>>>>>>> 2a7af923231b728606da777fb0c4760b631957d6
</script>