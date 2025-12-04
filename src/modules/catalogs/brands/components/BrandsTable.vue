<template>
    <Card class=" flex flex-wrap items-start gap-4">
        <template #title>Marcas registradas en la base de datos</template>
        <template #content>
            <SkeletonTable v-if="!brands.length" :rows="5" :headers="['Id Marca', 'Marca']"
                table-style="min-width: 110rem" />
            <DataTable v-else v-model:filters="filters" :value="brands" table-style="min-width: 110rem" paginator
                :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" :globalFilterFields="['IdMarca', 'Marca']">
                <template #header>
                    <BrandHeaderTable :filters v-model:showAddBrandDialog="showAddBrandDialog" />
                </template>
                <Column field="IdMarca" header="Id Marca" />
                <Column field="Marca" header="Marca" />
                <Column header="Acciones" style="width: 8rem">
                    <template #body="{ data }">
                        <EditableButtons :data @onDeletedBrand="onDeletedBrand" @onEditedBrand="onEditedBrand" />
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
    <AddBrandDialog :dialog="showAddBrandDialog" @update:dialog="hideDialog" @save-brand="saveBrand($event)" />
    <EditBrandDialog :dialog="showEditBrandDialog" :brand :isLoading="isLoading" @update:dialog="showEditBrandDialog = $event"
        @save-brand="onUpdateBrand" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBrands } from '../composables/useBrands';
import { SkeletonTable } from '@/modules/user/components';
import { useService } from '@/modules/processes/service/composables/useService';
import { AddBrandDialog, EditBrandDialog, BrandHeaderTable } from './';
import { EditableButtons } from '@/utils/tables/components';

const { brands, fetchBrands, showAddBrandDialog, showEditBrandDialog, saveBrand, hideDialog, onUpdateBrand, onDeletedBrand, onEditedBrand, selectedBrand: brand, isLoading } = useBrands();
const { filters } = useService();

onMounted(() => {
    fetchBrands();
}); 
</script>