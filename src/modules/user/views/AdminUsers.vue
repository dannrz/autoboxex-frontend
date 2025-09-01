<template>
    <DataTable v-if="products.length === 0">

    </DataTable>
    <DataTable v-else :value="products" stripedRows tableStyle="min-width: 50rem">
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
    </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const products = ref([])
</script>