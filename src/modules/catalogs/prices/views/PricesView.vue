<template>
    <h1 class="text-xl text-mauve-100 text-center">
        Catálogos - Precios
    </h1>
    <PricesTable :prices="prices" :loading="loadingTable" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePrice } from '../composables/usePrice';
import PricesTable from '../components/PricesTable.vue';

const { getAllPrices, prices, loadingTable } = usePrice();

onMounted(() => {
    getAllPrices();
});
</script>