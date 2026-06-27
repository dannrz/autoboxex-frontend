<template>
    <Card>
        <template #title>Catálogo de refacciones</template>
        <template #content>
            <SkeletonTable v-if="isTableLoading" :rows="10"
                :headers="['Refacción', 'Código', 'Tipo', 'Cantidad', 'Precio', 'Precio c/IVA', 'Marca', 'Calidad', 'Acciones']" />
            <DataTable v-else v-model:filters="filters" :value="refacciones" paginator :rows="10"
                :rowsPerPageOptions="[10, 20, 50, 100]"
                :globalFilterFields="['Refacción', 'Codigo', 'Marca', 'Tipo']"
                sortMode="single" removableSort>
                <template #header>
                    <div class="flex justify-between items-center">
                        <Button icon="pi pi-plus" severity="success" label="Agregar refacción" text rounded
                            @click="$emit('create')" />
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value"
                                placeholder="Buscar por nombre, código, marca o tipo..." />
                        </IconField>
                    </div>
                </template>

                <Column field="Refacción" header="Refacción" sortable style="min-width: 16rem" />

                <Column field="Codigo" header="Código" sortable style="min-width: 8rem">
                    <template #body="{ data }">
                        <span class="font-mono text-sm">{{ data.Codigo || '—' }}</span>
                    </template>
                </Column>

                <Column field="Tipo" header="Tipo" sortable style="min-width: 8rem">
                    <template #body="{ data }">
                        <Tag :value="data.Tipo || '—'" :severity="tipoSeverity(data.Tipo)" />
                    </template>
                </Column>

                <Column field="Cantidad" header="Cantidad" sortable style="min-width: 7rem">
                    <template #body="{ data }">
                        <span :class="data.Cantidad < 0 ? 'text-red-500 font-semibold' : ''">
                            {{ formatQty(data.Cantidad) }}
                        </span>
                    </template>
                </Column>

                <Column field="Precio" header="Precio" sortable style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.Precio != null ? formatCurrency(data.Precio) : '—' }}
                    </template>
                </Column>

                <Column field="PrecioIva" header="Precio c/IVA" sortable style="min-width: 9rem">
                    <template #body="{ data }">
                        {{ data.PrecioIva != null ? formatCurrency(data.PrecioIva) : '—' }}
                    </template>
                </Column>

                <Column field="Marca" header="Marca" sortable style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.Marca || '—' }}
                    </template>
                </Column>

                <Column field="Calidad" header="Calidad" sortable style="min-width: 8rem">
                    <template #body="{ data }">
                        <Tag :value="data.Calidad || '—'" :severity="calidadSeverity(data.Calidad)" />
                    </template>
                </Column>

                <Column header="Acciones" style="width: 8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" severity="info" text rounded
                            @click="$emit('edit', slotProps.data)"
                            v-tooltip.top="'Editar'" />
                        <Button icon="pi pi-trash" severity="danger" text rounded
                            @click="$emit('delete', slotProps.data)"
                            v-tooltip.top="'Eliminar'" />
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import Tag from 'primevue/tag';
import { SkeletonTable } from '@/modules/user/components';
import type { Refaccion } from '../interfaces';

defineProps<{
    refacciones: Array<Refaccion>;
    isTableLoading: boolean;
}>();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

defineEmits<{
    edit: [refaccion: Refaccion];
    delete: [refaccion: Refaccion];
    create: [];
}>();

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);

const formatQty = (value: number) =>
    new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(value);

const tipoSeverity = (tipo: string): string => {
    const map: Record<string, string> = {
        'Refaccion': 'info',
        'Refacción': 'info',
        'Servicio': 'success',
        'Consumible': 'warn',
    };
    return map[tipo] ?? 'secondary';
};

const calidadSeverity = (calidad: string): string => {
    const map: Record<string, string> = {
        'Excelente': 'success',
        'Buena': 'info',
        'BUENA': 'info',
        'Regular': 'warn',
        'Mala': 'danger',
    };
    return map[calidad] ?? 'secondary';
};
</script>
