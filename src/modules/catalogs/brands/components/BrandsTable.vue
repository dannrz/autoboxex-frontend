<template>
    <Card class=" flex flex-wrap items-start gap-4">
        <template #title>Marcas registradas en la base de datos</template>
        <template #content>
            <SkeletonTable v-if="!brands.length" :rows="5" :headers="['Id Marca', 'Marca']"
                table-style="min-width: 110rem" />
            <DataTable v-else v-model:filters="filters" :value="brands" table-style="min-width: 110rem" paginator
                :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]" :globalFilterFields="['IdMarca', 'Marca']">
                <template #header>
                    <div class="flex justify-between">
                        <Button label="Agregar marca" severity="secondary" icon="pi pi-plus" class="mr-2"
                            @click="showAddBrandDialog = true" />
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters.global.value" placeholder="Buscar marca..." />
                        </IconField>
                    </div>
                </template>
                <Column field="IdMarca" header="Id Marca"></Column>
                <Column field="Marca" header="Marca"></Column>
                <Column header="Acciones" style="width: 8rem">
                    <template #body="slotProps">
                        <div class="flex gap-4">
                            <Button icon="pi pi-pencil" severity="success" rounded />
                            <Button icon="pi pi-trash" severity="danger" outlined rounded />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
    <AddBrandDialog :dialog="showAddBrandDialog" @update:dialog="hideDialog" @save-brand="saveBrand($event)" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBrands } from '../composables/useBrands';
import { SkeletonTable } from '@/modules/user/components';
import { useService } from '@/modules/processes/service/composables/useService';
import AddBrandDialog from './AddBrandDialog.vue';
import type { Brand } from '../interfaces/Brand.interface';

const { brands, fetchBrands, showAddBrandDialog, onSavedBrand } = useBrands();
const { filters } = useService();

onMounted(() => {
    fetchBrands();
});

const hideDialog = () => {
    showAddBrandDialog.value = false;
}

const saveBrand = (name: string) => {
    onSavedBrand({ Marca: name } as Brand);
}
</script>