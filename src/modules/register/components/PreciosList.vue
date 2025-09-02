<template>
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
        <template #title>Tabla de precios</template>
        <template #content>
            <div class="card">
                <DataTable :value="precios" tableStyle="min-width: 50rem">
                    <Column field="code" header="Id Producto"></Column>
                    <Column field="name" header="Producto"></Column>
                    <Column field="category" header="Precio"></Column>
                   
                </DataTable>
            </div>
        </template>
        <template #footer>

        </template>
    </card>
</template>

<script setup lang="ts">

</script>
