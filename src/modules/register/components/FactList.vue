<template>
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Tabla de costos</template>
        <template #content>
            <div class="card">
                <DataTable :value="facturación" tableStyle="min-width: 50rem">
                    <Column field="id" header="Id Producto"></Column>
                    <Column field="producto" header="Producto"></Column>
                    <Column field="cant" header="Cantidad"></Column>
                    <Column field="price" header="Precio"></Column>
                    <Column field="total" header="Total"></Column>
                   
                </DataTable>
            </div>
        </template>
        <template #footer>

        </template>
    </card>
</template>

<script setup lang="ts">

</script>
