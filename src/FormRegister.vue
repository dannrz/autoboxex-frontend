<template>

    <Card style="width: 50.5rem; overflow: hidden; grid-column: auto;" class="mx-left my-4 ml-4">
        <template #title>Datos del Cliente y Auto</template>
        <template #content>
            <div class="grid grid-cols-5 gap-2">
                <div >
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="value11" inputId="on_label" :suggestions="items" @complete="search" size="small" />
                        <label for="">Id Cliente </label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4" >
                        <InputText id="" size="small"/>
                        <label for="">Cliente</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <AutoComplete v-model="value10" inputId="on_label" :suggestions="items" @complete="search" size="small"/>
                        <label for="on_label">Placas</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="value9" inputId="on_label" :suggestions="items" @complete="search" size="small"/>
                        <label for="on_label">Marca</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="value8" inputId="on_label" :suggestions="items" @complete="search" size="small"/>
                        <label for="">Modelo</label>
                    </FloatLabel>

                    <!-- -->
                </div>

                <div>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="value7" inputId="on_label" :suggestions="items" @complete="search" size="small" />
                        <label for="on_label">Orden entrada</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">Año</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <AutoComplete v-model="value6" inputId="on_label" :suggestions="items" @complete="search" size="small" />
                        <label for="">Color</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small"/>
                        <label for="">Serie</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <InputText id="" size="small" />
                        <label for="">Kilometraje</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel class="w-full md:w-56 my-4" variant="on">
                        <Select v-model="value5" inputId="on_label" :options="tipo" optionLabel="name" class="w-full" size="small" />
                        <label for="on_label">Tipo</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="my-4">
                        <DatePicker v-model="value4" inputId="on_label" showIcon iconDisplay="input"
                            dateFormat="dd/mm/yy" size="small" />
                        <label for="on_label">Fecha de entrada</label>
                    </FloatLabel>

                    <FloatLabel class="w-full md:w-56 my-4" variant="on">
                        <Select v-model="value3" inputId="on_label" :options="estado" optionLabel="name"
                            class="w-full" size="small" />
                        <label for="on_label">Estado</label>
                    </FloatLabel>
                    <FloatLabel class="w-full md:w-56 my-4" variant="on">
                          <InputText id=""  class="w-full md:w-56 "  size="small" />
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
                        <InputText id="" size="small"/>
                        <label for="">asdasd</label>
                    </FloatLabel>
                    <!--
                    -->
                    <FloatLabel variant="on" class="my-4">
                        <InputText id=""size="small" />
                        <label for="on_label"></label>
                    </FloatLabel>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-2">
                <div>
                    <FloatLabel variant="on">
                        <Textarea id="over_label" v-model="value2" rows="3" cols="52" style="resize: " class="my-2" size="small" />
                        <label for="on_label">Observaciones:</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel variant="on">
                        <Textarea id="over_label" v-model="value1" rows="3" cols="55" style="resize:" class="my-2" size="small" />
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
                        <DatePicker v-model="value0" inputId="on_label" showIcon iconDisplay="input"
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
                    <Button label="Insertar vehículo" icon="pi pi-check" iconPos="right" size="small" />
                </div>
            </div>
        </template>
    </Card>

</template>


<script setup lang="ts">
import { ref } from "vue";
import Card from 'primevue/card';
import FloatLabel from 'primevue/floatlabel';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
/*aquí inicia la búsqueda de placas*/

const value0 = ref('');
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
const value5 = ref('');
const value6 = ref('');
const value7 = ref('');
const value8 = ref('');
const value9 = ref('');
const value10 = ref('');
const value11 = ref('');
const items = ref([]);

const search = (event) => {
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

</script>
