<template>
    <Dialog v-model:visible="props.dialog" :style="{ width: '450px' }" header="Agregar marca" modal :closable="false">
        <div class="flex flex-col gap-6">
            <FloatLabel variant="in" class="col-span-3">
                <InputText v-model="brandName" id="marca" class="w-full" size="small" />
                <label for="marca">Marca</label>
            </FloatLabel>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Guardar" icon="pi pi-save" @click="save" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const brandName = ref<string>('');

const props = defineProps<{
    dialog: boolean
}>();

const emit = defineEmits<{
    (e: 'update:dialog', value: boolean): void,
    (e: 'saveBrand', name: string): void
}>();

const hideDialog = () => {
    emit('update:dialog', false);
}

const save = () => {
    emit('saveBrand', brandName.value);
    hideDialog();
    brandName.value = '';
};
</script>