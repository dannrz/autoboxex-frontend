<template>
    <Card class="mx-3">
        <template #title>Datos del Cliente y Auto</template>
        <template #content>
            <div class="grid grid-cols-4 gap-4 my-6">
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="idCliente">Id Cliente </label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="cliente" size="small" />
                    <label for="cliente">Cliente</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.placas" id="placas" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="placas">Placas</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.marca" id="marca" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="marca">Marca</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.modelo" id="modelo" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="modelo">Modelo</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <AutoComplete v-model="form.ordenEntrada" id="entradaOrden" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="entradaOrden">Orden entrada</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="year" size="small" />
                    <label for="year">Año</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <AutoComplete v-model="form.color" id="color" :suggestions="items" @complete="search"
                        size="small" />
                    <label for="color">Color</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="serie" size="small" />
                    <label for="serie">Serie</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="kilometraje" size="small" />
                    <label for="kilometraje">Kilometraje</label>
                </FloatLabel>
            </div>

            <!--  <div>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="form.ordenEntrada" inputId="on_label" :suggestions="items"
                            @complete="search" size="small" />
                        <label for="on_label">Orden entrada</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">Año</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="form.color" inputId="on_label" :suggestions="items" @complete="search"
                            size="small" />
                        <label for="">Color</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">Serie</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">Kilometraje</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel class="w-full md:w-56 my-4" variant="on">
                        <Select v-model="form.tipo" inputId="on_label" :options="tipo" optionLabel="name" class="w-full"
                            size="small" />
                        <label for="on_label">Tipo</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <DatePicker v-model="form.fechaEntrada" inputId="on_label" showIcon iconDisplay="input"
                            dateFormat="dd/mm/yy" size="small" />
                        <label for="on_label">Fecha de entrada</label>
                    </FloatLabel>

                    <FloatLabel class="w-full md:w-56 my-4" variant="on">
                        <Select v-model="form.estado" inputId="on_label" :options="estado" optionLabel="name"
                            class="w-full" size="small" />
                        <label for="on_label">Estado</label>
                    </FloatLabel>
                    <FloatLabel class="w-full md:w-56 my-4" variant="on">
                        <InputText id="" class="w-full md:w-56 " size="small" />
                        <label for="">Kilometraje</label>
                    </FloatLabel>


                </div>

                <div>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" placeholder="Nombre autoriza" />
                        <label for="">Autorización</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">asdasd</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="on_label"></label>
                    </FloatLabel>
                </div> -->

            <div class="grid grid-cols-4 gap-2">
                <!-- <div>
                    <FloatLabel variant="on">
                        <Textarea id="over_label" v-model="form.observaciones" rows="3" cols="52" style="resize: "
                            class="my-2" size="small" />
                        <label for="on_label">Observaciones:</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel variant="on">
                        <Textarea id="over_label" v-model="form.ingresaPor" rows="3" cols="55" style="resize:"
                            class="my-2" size="small" />
                        <label for="on_label">Ingresa por: </label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">Próximo servicio (días)</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel variant="on">
                        <DatePicker v-model="form.fechaSalida" inputId="on_label" showIcon iconDisplay="input"
                            dateFormat="dd/mm/yy" class="my-4" size="small" />
                        <label for="on_label">Fecha de salida</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="on_label"></label>
                    </FloatLabel>
                </div> -->
            </div>
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
import { ref } from "vue";
import type { FormRegister } from "../interfaces";
import { useToast } from "primevue";
/*aquí inicia la búsqueda de placas*/

const form = ref<FormRegister>({} as FormRegister)
const items = ref<string[]>([]);
const toast = useToast();

const search = (event: { query: string }) => {
    items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}
/*aquí inicia la búsqueda de placas*/
const nodes = ref();
const estado = ref([
    { name: 'Emitida', code: 'EM' },
    { name: 'Retenida', code: 'RE' },
    { name: 'Cancelada', code: 'CA' },
    { name: 'En pausa', code: 'PA' },
    { name: 'Ausente', code: 'AU' }
]);
const tipo = ref([
    { name: 'Servicio', code: 'NY' },
    { name: 'Mantenimiento', code: 'RM' },
    { name: 'Refacciones', code: 'LDN' },
    { name: 'Pintura', code: 'IST' },
    { name: 'Talacha', code: 'PRS' }
]);

const onSubmit = (): void => {
    console.log(form.value);
}

const onClear = (): void => {
    form.value = {} as FormRegister;
    toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
}
</script>