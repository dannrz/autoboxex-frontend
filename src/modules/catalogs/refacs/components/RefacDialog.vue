<template>
    <Dialog :visible="dialog" :style="{ width: '450px' }" :header="title" modal :closable="false">
        <Form v-slot="$form" :resolver @submit="submit" class="grid grid-cols-6 gap-6 p-1">
            <FloatLabel variant="on" class="col-span-6">
                <InputNumber v-model="model.IdRefaccion" id="id" class="w-full" size="small" disabled />
                <label for="id">ID</label>
            </FloatLabel>
            <InputWithMessage v-model="model.Refacción" :form="$form" refaccionType="Refaccion" type="string"
                class="col-span-6" />
            <FloatLabel variant="on" class="col-span-3">
                <Select v-model="model.Unidad" id="Unidad" class="w-full" size="small" :options="unidades" />
                <label for="Unidad">Unidad</label>
            </FloatLabel>
            <InputWithMessage v-model="model.Codigo" :form="$form" refaccionType="Codigo" type="number"
                class="col-span-3" />
            <FloatLabel variant="on" class="col-span-3">
                <Select v-model="model.Tipo" id="tipo" class="w-full" size="small" :options="tipos" />
                <label for="tipo">Tipo</label>
            </FloatLabel>
            <InputWithMessage v-model="model.Cantidad" :form="$form" refaccionType="Cantidad" type="number"
                class="col-span-3" />

            <FloatLabel variant="on" class="col-span-3">
                <InputNumber v-model="model.Precio" id="precio" class="w-full" size="small" mode="currency"
                    currency="MXN" @input="updatePrecioIva($event.value as number)" />
                <label for="precio">Precio</label>
            </FloatLabel>

            <InputWithMessage v-model="model.Marca" :form="$form" refaccionType="Marca" type="string"
                class="col-span-3" />

            <FloatLabel variant="on" class="col-span-3">
                <Select v-model="model.Calidad" id="calidad" class="w-full" size="small" :options="calidades" />
                <label for="calidad">Calidad</label>
            </FloatLabel>
            <FloatLabel variant="on" class="col-span-3">
                <InputNumber v-model="model.PrecioIva" id="precioiva" class="w-full" size="small" disabled
                    mode="currency" currency="MXN" />
                <label for="precioiva">Precio con IVA</label>
            </FloatLabel>
        </Form>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="$emit('close')" />
            <Button v-if="!isLoading" label="Guardar" icon="pi pi-save" @click="create" />
            <Button v-else class="w-[8em]" disabled outlined>
                <ProgressSpinner id="spinner" />
            </Button>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import InputNumber from 'primevue/inputnumber';
import type { Refaccion } from '../interfaces';
import { InputWithMessage } from './';

defineProps<{
    dialog: boolean,
    title: string,
    unidades: string[],
    tipos: string[],
    calidades: string[],
    isLoading: boolean,
    updatePrecioIva: (precio: number) => void,
    submit: (event: FormSubmitEvent<Record<string, any>>) => void,
    create: () => void,
    resolver: ReturnType<typeof zodResolver>,
}>();

defineEmits<{
    close: [],
    save: [],
}>();

const model = defineModel<Refaccion>({
    required: true,
});
</script>