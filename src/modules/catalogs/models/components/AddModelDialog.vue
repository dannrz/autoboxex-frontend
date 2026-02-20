<template>
    <Dialog :visible="dialog" :style="{ width: '450px' }" header="Agregar modelo" modal :closable="false">
        <div class="flex flex-col gap-6">
            <FloatLabel variant="on" class="col-span-3">
                <Select id="marca" class="w-full" size="small" :options="brands" optionLabel="Marca" filter
                    v-model="model.Marca" />
                <label for="marca">Marca</label>
            </FloatLabel>
            <FloatLabel variant="on" class="col-span-3">
                <InputText id="modelo" class="w-full" size="small" v-model="model.Modelo" />
                <label for="modelo">Modelo</label>
            </FloatLabel>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="$emit('update:dialog', false)" />
            <Button v-if="!isLoadingSaveModel" label="Guardar" icon="pi pi-save" @click="saveData" />
            <Button v-else class="w-[8em]" disabled outlined>
                <ProgressSpinner id="spinner" />
            </Button>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import type { Brand } from '../../brands/interfaces';
import type { ModelRequest } from '../interfaces';

defineProps<{
    dialog: boolean,
    brands: Array<Brand>,
    isLoadingSaveModel: boolean,
    saveData: () => void,
    model: ModelRequest,
}>();

defineEmits<{
    'update:dialog': [value: boolean],
}>();
</script>