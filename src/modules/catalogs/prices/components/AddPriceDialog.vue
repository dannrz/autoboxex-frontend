<template>
    <Dialog :visible="dialog" header="Agregar servicio" modal :closable="false" class="w-2/6">
        <div class="flex flex-col gap-6">
            <FloatLabel variant="in" class="col-span-3">
                <InputText :model-value="String(lastId)" id="id" class="w-full" size="small" disabled />
                <label for="id">ID</label>
            </FloatLabel>
            <FloatLabel variant="in" class="col-span-3">
                <InputText id="servicio" class="w-full" size="small" />
                <label for="servicio">Servicio</label>
            </FloatLabel>
            <FloatLabel variant="in" class="col-span-3">
                <InputNumber id="precio" class="w-full" size="small" mode="currency" currency="MXN" locale="en-US" :min-fraction-digits="2" />
                <label for="precio">Precio</label>
            </FloatLabel>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="$emit('close', false)" />
            <Button label="Guardar" icon="pi pi-save" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import { usePrice } from '../composables/usePrice';

const props = defineProps<{
    dialog: boolean
}>();

defineEmits<{
    close: [value: boolean]
}>();

const { lastId, getLastId } = usePrice();

watch(() => props.dialog, (value) => {
    if (value) {
        getLastId();
    }
}, { immediate: true });
</script>