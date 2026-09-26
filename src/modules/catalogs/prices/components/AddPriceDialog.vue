<template>
    <Dialog :visible="dialog" header="Agregar servicio" modal :closable="false" class="w-2/6">
        <div class="flex flex-col gap-6">
            <FloatLabel variant="in" class="col-span-3">
                <InputText :model-value="String(lastId)" id="id" class="w-full" size="small" disabled />
                <label for="id">ID</label>
            </FloatLabel>
            <div class="flex flex-col gap-1">
                <FloatLabel variant="in" class="col-span-3">
                    <InputText v-model="servicio" id="servicio" class="w-full" size="small" :invalid="errors.servicio" />
                    <label for="servicio">Servicio</label>
                </FloatLabel>
                <Message v-if="errors.servicio" severity="error" size="small" variant="simple">El servicio es obligatorio</Message>
            </div>
            <div class="flex flex-col gap-1">
                <FloatLabel variant="in" class="col-span-3">
                    <InputNumber v-model="precio" id="precio" class="w-full" size="small" mode="currency" currency="MXN" locale="en-US" :min-fraction-digits="2" :invalid="errors.precio" />
                    <label for="precio">Precio</label>
                </FloatLabel>
                <Message v-if="errors.precio" severity="error" size="small" variant="simple">El precio es obligatorio</Message>
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="$emit('close', false)" />
            <Button label="Guardar" icon="pi pi-save" :loading="saving" @click="onSave" />
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

const emit = defineEmits<{
    close: [value: boolean]
}>();

const { lastId, servicio, precio, saving, errors, initForm, savePrice } = usePrice();

const onSave = async (): Promise<void> => {
    if (await savePrice()) emit('close', false);
}

watch(() => props.dialog, (value) => {
    if (value) initForm();
}, { immediate: true });
</script>