<template>
    <Card style="width: 50.5rem; overflow: hidden; grid-column: auto;" class="mx-left my-4 ml-4">
        <template #title>Datos del Cliente y Auto</template>
        <template #content>
            <div class="grid grid-cols-5 gap-2">
                <div>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="form.idCliente" inputId="on_label" :suggestions="items"
                            @complete="search" size="small" />
                        <label for="">Id Cliente </label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">Cliente</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <AutoComplete v-model="form.placas" inputId="on_label" :suggestions="items" @complete="search"
                            size="small" />
                        <label for="on_label">Placas</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="form.marca" inputId="on_label" :suggestions="items" @complete="search"
                            size="small" />
                        <label for="on_label">Marca</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="form.modelo" inputId="on_label" :suggestions="items" @complete="search"
                            size="small" />
                        <label for="">Modelo</label>
                    </FloatLabel>

                    <!-- -->
                </div>

                <div>
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
                    <!--posiblemente cambiar autorización a SELECT con los nombres de quienes autorizan-->
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" placeholder="Nombre autoriza" />
                        <label for="">Autorización</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">asdasd</label>
                    </FloatLabel>
                    <!--
                    -->
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="on_label"></label>
                    </FloatLabel>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-2">
                <div>
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
                </div>
            </div>

            <div class="card flex flex-col items-end gap-4 my-4">
                <!--Este botón debería "reinciar" el formulario para poder generar un nuevo registro-->
                <div class="flex flex-wrap gap-4 justify-center">
                    <Button label="Limpiar Formulario" icon="pi pi-refresh" iconPos="right" size="small" />
                </div>
                <div class="flex flex-wrap gap-4 justify-center">
                    <Button label="Insertar vehículo" icon="pi pi-check" iconPos="right" size="small"
                        @click="onSubmit" />
                </div>
            </div>
        </template>
    </Card>

</template>


<script setup lang="ts">
import { ref } from "vue";
import type { FormRegister } from "../interfaces";
import { api } from "@/api/baseApi";
/*aquí inicia la búsqueda de placas*/

const form = ref<FormRegister>({} as FormRegister)

const items = ref<string[]>([]);

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

</script>
