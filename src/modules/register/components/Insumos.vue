<template>
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Tabla de insumos</template>
        <template #content>
            <div class="card">
                <DataTable :value="refax" tableStyle="min-width: 50rem">
                    <Column field="code" header="Refacción"></Column>
                    <Column field="name" header="Tipo"></Column>
                    <Column field="category" header="Cantidad"></Column>
                    <Column field="quantity" header="Precio"></Column>
                    <Column field="quantity" header="Importe"></Column>
                </DataTable>
            </div>
        </template>
        <template #footer>

        </template>
    </card>
</template>

<script setup lang="ts">

</script>
