<template>
    <Dialog :visible="dialog" :style="{ width: '450px' }" header="Agregar modelo" modal :closable="false">
        <div class="flex flex-col gap-6">
            <FloatLabel variant="on" class="col-span-3">
                <Select id="marca" class="w-full" size="small" :options="brands" optionLabel="Marca" filter
                    v-model="model!.Marca" />
                <label for="marca">Marca</label>
            </FloatLabel>
            <FloatLabel variant="on" class="col-span-3">
                <InputText id="modelo" class="w-full" size="small" v-model="model!.Modelo" />
                <label for="modelo">Modelo</label>
            </FloatLabel>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="$emit('update:dialog', false)" />
            <Button label="Guardar" icon="pi pi-save" @click="saveData(model)" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import type { Brand } from '../../brands/interfaces';
import { useModels } from '../composables/useModels';
import type { ModelRequest } from '../interfaces';

defineProps<{
    dialog: boolean,
    brands: Array<Brand>,
    saveData: (data: ModelRequest) => void
}>();

defineEmits<{
    'update:dialog': [value: boolean],
}>();

const { model } = useModels();
</script>