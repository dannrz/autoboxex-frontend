<template>
    <div class="card">
        <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="customers" tableStyle="min-width: 50rem"
            expandableRowGroups rowGroupMode="subheader" groupRowsBy="Paquete" @rowgroup-expand="onRowGroupExpand"
            @rowgroup-collapse="onRowGroupCollapse" sortMode="single" sortField="Paquete" :sortOrder="1">
            <template #groupheader="{ data }">
                <span class="font-bold">
                    {{ data.Paquete }}
                </span>
            </template>
            <Column field="IdPaquete" header="ID Paquete"></Column>
            <Column field="IdRefaccion" header="ID Refacción"></Column>
            <Column field="refaccion" header="Refacción"></Column>
            <Column field="Cantidad" header="Cantidad"></Column>
        </DataTable>
        <Toast />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { PackageService } from '../services/PackageService';

const customers = ref<any[]>([]);
/* {
    id: 1000,
        name: 'James Butt',
            country: {
        name: 'Algeria',
            code: 'dz'
    },
    company: 'Benton, John B Jr',
        date: '2015-09-13',
            status: 'unqualified',
                verified: true,
                    activity: 17,
                        representative: {
        name: 'Ioni Bowcher',
            image: 'ionibowcher.png'
    },
    balance: 70663
}, */

onMounted(() => {
    PackageService.getPackages()
        .then(({ data }): void => {
            customers.value = data;
        })
});


const expandedRowGroups = ref<any[]>([]);
const toast = useToast();
const onRowGroupExpand = (event: any) => {
    toast.add({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data, life: 3000 });
};
const onRowGroupCollapse = (event: any) => {
    toast.add({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data, life: 3000 });
};
</script>