<template>
    <Dialog v-model:visible="$props.dialog" :style="{ width: '450px' }" :header="`Editar marca ${$props.brand.Marca}`"
        modal :closable="false">
        <div class="flex flex-col gap-6">
            <FloatLabel variant="in" class="col-span-3">
                <InputText v-model="editedBrand.Marca" id="marca" class="w-full" size="small" />
                <label for="marca">Marca</label>
            </FloatLabel>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="$emit('update:dialog', false)" />
            <Button v-if="!$props.isLoading" label="Guardar" icon="pi pi-save"
                @click="$emit('saveBrand', $props.brand, editedBrand.Marca, false)" />
            <Button v-else class="w-30" disabled outlined>
                <ProgressSpinner id="spinner" />
            </Button>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Brand } from '../interfaces';

const editedBrand = ref<Brand>({} as Brand);

defineProps<{
    dialog: boolean,
    brand: Brand,
    isLoading: boolean
}>();

defineEmits<{
    'update:dialog': [value: boolean],
    saveBrand: [brand: Brand, name: string, dialogState: boolean]
}>();
</script>