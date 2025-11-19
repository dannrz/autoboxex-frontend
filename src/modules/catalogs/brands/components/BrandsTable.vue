<template>
    <Card class=" flex flex-wrap items-start gap-4">
        <template #title>Marcas registradas en la base de datos</template>
        <template #content>
            <SkeletonTable v-if="!brands.length" :rows="5" :headers="['Id Marca', 'Marca']" table-style="min-width: 110rem" />
            <DataTable v-else :value="brands" table-style="min-width: 110rem" paginator :rows="10"
                :rowsPerPageOptions="[10, 20, 50, 100]">
                <Column field="IdMarca" header="Id Marca"></Column>
                <Column field="Marca" header="Marca"></Column>
            </DataTable>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBrands } from '../composables/useBrands';
import { SkeletonTable } from '@/modules/user/components';

const { brands, fetchBrands } = useBrands();

onMounted(() => {
    fetchBrands();
});
</script>