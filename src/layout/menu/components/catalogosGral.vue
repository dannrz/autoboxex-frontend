<template>
 <div class="card">
  <DataTable :value="products" tableStyle="min-width: 100%">
    <Column field="idvehiculo" header="ID" />
    <Column field="placas" header="Placas" />
    <Column field="modelo" header="Modelo" />
    <Column field="marca" header="Marca" />
    <Column field="año" header="Año" />
    <Column field="color" header="Color" />
    <Column field="serie" header="Serie" />
  </DataTable>
    </div>
</template>


<script setup lang="ts">






import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { ref } from 'vue';

const columns = ref([
    {field: 'idvehiculo', header: 'Name'},
    {field: 'placas', header: 'placas'},
    {field: 'modelo', header: 'modelo'},
    {field: 'marca', header: 'marca'},
    {field: 'año', header: 'año'},
    {field: 'color', header: 'color'},
    {field: 'serie', header: 'serie'}
]);
const selectedColumns = ref(columns.value);
const products = ref([
    { idvehiculo: 1, placas: 'ABC-1234', modelo: 'Civic', marca: 'Honda', año: 2018, color: 'Gris', serie: '1HGCM82633A004352' },
  { idvehiculo: 2, placas: 'XYZ-5678', modelo: 'Corolla', marca: 'Toyota', año: 2020, color: 'Blanco', serie: '2T1BURHE1JC073567' },
  { idvehiculo: 3, placas: 'JKL-9123', modelo: 'Jetta', marca: 'Volkswagen', año: 2017, color: 'Negro', serie: '3VW2B7AJ5HM210578' },
  { idvehiculo: 4, placas: 'LMN-4567', modelo: 'Sentra', marca: 'Nissan', año: 2019, color: 'Rojo', serie: '3N1AB7AP3KY215678' },
  { idvehiculo: 5, placas: 'QWE-8421', modelo: 'Focus', marca: 'Ford', año: 2016, color: 'Azul', serie: '1FADP3F27GL269845' },
  { idvehiculo: 6, placas: 'RTY-9630', modelo: 'Cruze', marca: 'Chevrolet', año: 2018, color: 'Plata', serie: '1G1BE5SM7J7139483' },
  { idvehiculo: 7, placas: 'UIO-1947', modelo: 'Rio', marca: 'Kia', año: 2021, color: 'Negro', serie: 'KNADM5A33F6987345' },
  { idvehiculo: 8, placas: 'PAS-7770', modelo: 'Mazda 3', marca: 'Mazda', año: 2019, color: 'Rojo', serie: 'JM1BN1V74J1167345' },
  { idvehiculo: 9, placas: 'ZXC-3987', modelo: 'Elantra', marca: 'Hyundai', año: 2020, color: 'Blanco', serie: 'KMHD84LF0HU317845' },
  { idvehiculo: 10, placas: 'BNM-0234', modelo: 'Altima', marca: 'Nissan', año: 2015, color: 'Gris', serie: '1N4AL3AP3FC479234' },
  { idvehiculo: 11, placas: 'TRE-8372', modelo: 'Accord', marca: 'Honda', año: 2019, color: 'Azul', serie: '1HGCR2F3XHA009876' },
  { idvehiculo: 12, placas: 'GHJ-4456', modelo: 'Versa', marca: 'Nissan', año: 2022, color: 'Gris', serie: '3N1CN7AP4GL894236' },
  { idvehiculo: 13, placas: 'YUI-8832', modelo: 'Fusion', marca: 'Ford', año: 2018, color: 'Negro', serie: '3FA6P0K92HR114263' },
  { idvehiculo: 14, placas: 'CVB-1230', modelo: 'Camry', marca: 'Toyota', año: 2020, color: 'Blanco', serie: '4T1BF1FK0HU302145' },
  { idvehiculo: 15, placas: 'MNB-4578', modelo: 'Malibu', marca: 'Chevrolet', año: 2017, color: 'Rojo', serie: '1G1ZB5ST9HF234675' },
  { idvehiculo: 16, placas: 'QAZ-6743', modelo: 'Beetle', marca: 'Volkswagen', año: 2016, color: 'Amarillo', serie: '3VWJX7AT2GM604589' },
  { idvehiculo: 17, placas: 'EDC-7894', modelo: 'Soul', marca: 'Kia', año: 2021, color: 'Naranja', serie: 'KNDJP3A50F7792314' },
  { idvehiculo: 18, placas: 'RFV-2374', modelo: 'CX-5', marca: 'Mazda', año: 2019, color: 'Gris', serie: 'JM3KFABL6K0603745' },
  { idvehiculo: 19, placas: 'TGB-6578', modelo: 'Tucson', marca: 'Hyundai', año: 2020, color: 'Negro', serie: 'KM8J33A45JU773567' },
  { idvehiculo: 20, placas: 'WSX-4563', modelo: 'Sentra', marca: 'Nissan', año: 2016, color: 'Verde', serie: '3N1AB7AP8GY256478' },
  { idvehiculo: 21, placas: 'XED-4392', modelo: 'Spark', marca: 'Chevrolet', año: 2015, color: 'Azul', serie: 'KL8CB6S97FC752389' },
  { idvehiculo: 22, placas: 'VFR-3492', modelo: 'Picanto', marca: 'Kia', año: 2021, color: 'Blanco', serie: 'KNABX511BKT823934' },
  { idvehiculo: 23, placas: 'BGT-2734', modelo: 'Yaris', marca: 'Toyota', año: 2022, color: 'Rojo', serie: 'VNKKTUD3XNA984672' },
  { idvehiculo: 24, placas: 'NHY-9983', modelo: 'Tiida', marca: 'Nissan', año: 2017, color: 'Gris', serie: '3N1BC13E28L422736' },
  { idvehiculo: 25, placas: 'UJM-5684', modelo: 'Forte', marca: 'Kia', año: 2019, color: 'Negro', serie: '3KPFK4A77KE027839' },

]);
/*

interface Vehiculo {
  idvehiculo: number;
  placas: string;
  modelo: string;
  marca: string;
  año: number;
  color: string;
  serie: string;
}

const coches = ref([
  { idvehiculo: 1, placas: 'ABC-1234', modelo: 'Civic', marca: 'Honda', año: 2018, color: 'Gris', serie: '1HGCM82633A004352' },
  { idvehiculo: 2, placas: 'XYZ-5678', modelo: 'Corolla', marca: 'Toyota', año: 2020, color: 'Blanco', serie: '2T1BURHE1JC073567' },
  { idvehiculo: 3, placas: 'JKL-9123', modelo: 'Jetta', marca: 'Volkswagen', año: 2017, color: 'Negro', serie: '3VW2B7AJ5HM210578' },
  { idvehiculo: 4, placas: 'LMN-4567', modelo: 'Sentra', marca: 'Nissan', año: 2019, color: 'Rojo', serie: '3N1AB7AP3KY215678' },
  { idvehiculo: 5, placas: 'QWE-8421', modelo: 'Focus', marca: 'Ford', año: 2016, color: 'Azul', serie: '1FADP3F27GL269845' },
  { idvehiculo: 6, placas: 'RTY-9630', modelo: 'Cruze', marca: 'Chevrolet', año: 2018, color: 'Plata', serie: '1G1BE5SM7J7139483' },
  { idvehiculo: 7, placas: 'UIO-1947', modelo: 'Rio', marca: 'Kia', año: 2021, color: 'Negro', serie: 'KNADM5A33F6987345' },
  { idvehiculo: 8, placas: 'PAS-7770', modelo: 'Mazda 3', marca: 'Mazda', año: 2019, color: 'Rojo', serie: 'JM1BN1V74J1167345' },
  { idvehiculo: 9, placas: 'ZXC-3987', modelo: 'Elantra', marca: 'Hyundai', año: 2020, color: 'Blanco', serie: 'KMHD84LF0HU317845' },
  { idvehiculo: 10, placas: 'BNM-0234', modelo: 'Altima', marca: 'Nissan', año: 2015, color: 'Gris', serie: '1N4AL3AP3FC479234' },
  { idvehiculo: 11, placas: 'TRE-8372', modelo: 'Accord', marca: 'Honda', año: 2019, color: 'Azul', serie: '1HGCR2F3XHA009876' },
  { idvehiculo: 12, placas: 'GHJ-4456', modelo: 'Versa', marca: 'Nissan', año: 2022, color: 'Gris', serie: '3N1CN7AP4GL894236' },
  { idvehiculo: 13, placas: 'YUI-8832', modelo: 'Fusion', marca: 'Ford', año: 2018, color: 'Negro', serie: '3FA6P0K92HR114263' },
  { idvehiculo: 14, placas: 'CVB-1230', modelo: 'Camry', marca: 'Toyota', año: 2020, color: 'Blanco', serie: '4T1BF1FK0HU302145' },
  { idvehiculo: 15, placas: 'MNB-4578', modelo: 'Malibu', marca: 'Chevrolet', año: 2017, color: 'Rojo', serie: '1G1ZB5ST9HF234675' },
  { idvehiculo: 16, placas: 'QAZ-6743', modelo: 'Beetle', marca: 'Volkswagen', año: 2016, color: 'Amarillo', serie: '3VWJX7AT2GM604589' },
  { idvehiculo: 17, placas: 'EDC-7894', modelo: 'Soul', marca: 'Kia', año: 2021, color: 'Naranja', serie: 'KNDJP3A50F7792314' },
  { idvehiculo: 18, placas: 'RFV-2374', modelo: 'CX-5', marca: 'Mazda', año: 2019, color: 'Gris', serie: 'JM3KFABL6K0603745' },
  { idvehiculo: 19, placas: 'TGB-6578', modelo: 'Tucson', marca: 'Hyundai', año: 2020, color: 'Negro', serie: 'KM8J33A45JU773567' },
  { idvehiculo: 20, placas: 'WSX-4563', modelo: 'Sentra', marca: 'Nissan', año: 2016, color: 'Verde', serie: '3N1AB7AP8GY256478' },
  { idvehiculo: 21, placas: 'XED-4392', modelo: 'Spark', marca: 'Chevrolet', año: 2015, color: 'Azul', serie: 'KL8CB6S97FC752389' },
  { idvehiculo: 22, placas: 'VFR-3492', modelo: 'Picanto', marca: 'Kia', año: 2021, color: 'Blanco', serie: 'KNABX511BKT823934' },
  { idvehiculo: 23, placas: 'BGT-2734', modelo: 'Yaris', marca: 'Toyota', año: 2022, color: 'Rojo', serie: 'VNKKTUD3XNA984672' },
  { idvehiculo: 24, placas: 'NHY-9983', modelo: 'Tiida', marca: 'Nissan', año: 2017, color: 'Gris', serie: '3N1BC13E28L422736' },
  { idvehiculo: 25, placas: 'UJM-5684', modelo: 'Forte', marca: 'Kia', año: 2019, color: 'Negro', serie: '3KPFK4A77KE027839' },
]);*/
</script>

