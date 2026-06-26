<template>
    <Card class="w-full">
        <template #title>
            <div class="flex items-center gap-2">
                <i class="pi pi-receipt text-orange-500" />
                <span>Costos</span>
            </div>
        </template>
        <template #content>
            <DataTable :value="costos" paginator :editMode="isAdmin ? 'cell' : undefined" :pt="tableProps" :rows="5"
                @cell-edit-complete="onCellEditComplete" :rowsPerPageOptions="[5, 10, 20, 50]"
                size="small" class="w-full">
                <Column field="id" header="Id" style="width: 4rem" />
                <Column v-for="{ field, header } of editableColumns" :key="field" :field="field"
                    :header="header">
                    <template #body="{ data, field }">
                        <span v-if="field === 'precio'" class="flex items-center gap-1">
                            {{ formatCurrency(data[field]) }}
                            <i v-if="!isAdmin" class="pi pi-lock text-xs text-surface-400" v-tooltip="'Solo administradores pueden modificar el precio'" />
                        </span>
                        <span v-else>{{ data[field as keyof typeof data] }}</span>
                    </template>
                    <template v-if="isAdmin" #editor="{ data, field }">
                        <InputText v-if="field !== 'precio'" v-model="data[field]" autofocus fluid size="small" />
                        <InputNumber v-else v-model="data[field]" mode="currency" currency="USD"
                            locale="en-US" autofocus fluid size="small" />
                    </template>
                </Column>
                <Column header="Total" style="width: 7rem">
                    <template #body="{ data }">
                        <span class="font-semibold text-green-600 dark:text-green-400">
                            {{ formatCurrency(data.cantidad * data.precio) }}
                        </span>
                    </template>
                </Column>
                <template #empty>
                    <div class="flex flex-col items-center gap-2 py-6 text-surface-400">
                        <i class="pi pi-shopping-cart text-4xl" />
                        <span class="text-sm">Selecciona un precio para agregar costos</span>
                    </div>
                </template>
            </DataTable>
        </template>
        <template #footer>
            <div class="flex justify-between items-center pt-1">
                <Button v-if="costos.length" label="Limpiar" icon="pi pi-trash" size="small"
                    severity="danger" text @click="$emit('clear')" />
                <div v-if="costos.length" class="flex items-center gap-2 ml-auto">
                    <span class="text-sm text-surface-500">Total:</span>
                    <span class="font-bold text-lg text-green-600 dark:text-green-400">
                        {{ formatCurrency(costos.reduce((a, c) => a + c.cantidad * c.precio, 0)) }}
                    </span>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import type { Costos } from '../interfaces';
import { useService } from '../composables/useService';
import { computed } from 'vue';
import type { User } from '@/layout/login/interfaces';

defineProps<{
    costos: Costos[],
    loading: boolean
}>();

defineEmits<{ clear: [] }>();

const { editableColumns, tableProps, formatCurrency, onCellEditComplete } = useService();

const isAdmin = computed(() => {
    const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role?.role_name === 'admin';
});
</script>
