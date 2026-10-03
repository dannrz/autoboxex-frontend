<template>
    <h1 class="text-xl text-mauve-100 text-center">
        Catálogos - Precios
    </h1>
    <PricesTable :prices="prices" :loading="loadingTable" :filters="filters" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePrice } from '../composables/usePrice';
import PricesTable from '../components/PricesTable.vue';
import { useFilter } from '@table/composables';

const { getAllPrices, prices, loadingTable } = usePrice();
const { filters } = useFilter();

onMounted(() => {
    getAllPrices();
});
</script>