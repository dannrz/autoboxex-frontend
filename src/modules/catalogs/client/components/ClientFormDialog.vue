<template>
    <Dialog v-model:visible="visible" :header="isEdit ? 'Editar Cliente' : 'Nuevo Cliente'" modal
        :style="{ width: '52rem' }" :breakpoints="{ '768px': '95vw' }" @hide="onHide">
        <div class="grid grid-cols-12 gap-x-4 gap-y-5 pt-2">

            <!-- Nombre -->
            <FloatLabel variant="on" class="col-span-8">
                <InputText id="cf-nombre" v-model="form.Nombre" class="w-full" size="small" />
                <label for="cf-nombre">Cliente *</label>
            </FloatLabel>

            <!-- RFC -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-rfc" v-model="form.RFC" class="w-full" size="small" />
                <label for="cf-rfc">RFC</label>
            </FloatLabel>

            <!-- Dirección -->
            <FloatLabel variant="on" class="col-span-8">
                <InputText id="cf-dir" v-model="form.Direccion" class="w-full" size="small" />
                <label for="cf-dir">Dirección</label>
            </FloatLabel>

            <!-- CP -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-cp" v-model="form.CP" class="w-full" size="small" />
                <label for="cf-cp">C.P.</label>
            </FloatLabel>

            <!-- Colonia -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-col" v-model="form.Colonia" class="w-full" size="small" />
                <label for="cf-col">Colonia</label>
            </FloatLabel>

            <!-- Zona/Municipio -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-pob" v-model="form.Poblacion" class="w-full" size="small" />
                <label for="cf-pob">Zona / Municipio</label>
            </FloatLabel>

            <!-- Ciudad/Estado -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-edo" v-model="form.Estado" class="w-full" size="small" />
                <label for="cf-edo">Ciudad / Estado</label>
            </FloatLabel>

            <!-- Email -->
            <FloatLabel variant="on" class="col-span-6">
                <InputText id="cf-email" v-model="form.eMail" type="email" class="w-full" size="small" />
                <label for="cf-email">Correo electrónico</label>
            </FloatLabel>

            <!-- Contacto -->
            <FloatLabel variant="on" class="col-span-6">
                <InputText id="cf-contacto" v-model="form.Contacto" class="w-full" size="small" />
                <label for="cf-contacto">Contacto</label>
            </FloatLabel>

            <!-- Sucursal -->
            <FloatLabel variant="on" class="col-span-6">
                <InputText id="cf-suc" v-model="form.Sucursal" class="w-full" size="small" />
                <label for="cf-suc">Sucursal</label>
            </FloatLabel>

            <!-- Crédito -->
            <FloatLabel variant="on" class="col-span-6">
                <InputText id="cf-cred" v-model="creditoRaw" class="w-full" size="small"
                    inputmode="numeric" placeholder=" " />
                <label for="cf-cred">Crédito (días)</label>
            </FloatLabel>

            <Divider class="col-span-12 my-0" />

            <!-- Tel. Particular -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-tel1" v-model="form.Telefono" class="w-full" size="small" />
                <label for="cf-tel1">Tel. Particular</label>
            </FloatLabel>

            <!-- Tel. Móvil -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-tel2" v-model="form.Telefono2" class="w-full" size="small" />
                <label for="cf-tel2">Tel. Móvil</label>
            </FloatLabel>

            <!-- Tel. Oficina -->
            <FloatLabel variant="on" class="col-span-4">
                <InputText id="cf-tel3" v-model="form.Telefono3" class="w-full" size="small" />
                <label for="cf-tel3">Tel. Oficina</label>
            </FloatLabel>

            <Divider class="col-span-12 my-0" />

            <!-- Descuento -->
            <FloatLabel variant="on" class="col-span-6">
                <InputText id="cf-desc" v-model="descuentoRaw" class="w-full" size="small"
                    inputmode="decimal" placeholder=" " />
                <label for="cf-desc">Descuento (%)</label>
            </FloatLabel>

            <!-- Mano de Obra -->
            <FloatLabel variant="on" class="col-span-6">
                <InputText id="cf-mo" v-model="manoObraRaw" class="w-full" size="small"
                    inputmode="decimal" placeholder=" " />
                <label for="cf-mo">Mano de Obra ($)</label>
            </FloatLabel>

            <!-- Errores -->
            <div v-if="errors.length" class="col-span-12">
                <Message v-for="err in errors" :key="err" severity="error" size="small">{{ err }}</Message>
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2 mt-2">
                <Button label="Cancelar" severity="secondary" size="small" icon="pi pi-times"
                    iconPos="right" @click="visible = false" />
                <Button :label="isEdit ? 'Guardar cambios' : 'Registrar'" size="small"
                    icon="pi pi-check" iconPos="right" :loading="saving" @click="onSubmit" />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useToast } from 'primevue';
import { ClientService } from '../services/ClientService';
import type { Client, ClientForm } from '../interfaces';

const props = defineProps<{
    modelValue: boolean;
    client?: Client | null;
}>();

const emits = defineEmits<{
    'update:modelValue': [value: boolean];
    saved: [client: Client];
}>();

const toast = useToast();
const saving = ref(false);
const errors = ref<string[]>([]);
const isEdit = ref(false);

const creditoRaw = ref('');
const descuentoRaw = ref('');
const manoObraRaw = ref('');

const emptyForm = (): ClientForm => ({
    Nombre: '', RFC: null, CP: null, eMail: null, Direccion: null,
    Colonia: null, Poblacion: null, Estado: null, Contacto: null,
    Sucursal: null, Credito: null, Telefono: null, Telefono2: null,
    Telefono3: null, Descuento: null, ManoObra: null,
});

const form = ref<ClientForm>(emptyForm());

const visible = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    visible.value = val;
    if (val) {
        errors.value = [];
        if (props.client) {
            isEdit.value = true;
            form.value = {
                Nombre: props.client.Nombre,
                RFC: props.client.RFC,
                CP: props.client.CP,
                eMail: props.client.eMail,
                Direccion: props.client.Direccion,
                Colonia: props.client.Colonia,
                Poblacion: props.client.Poblacion,
                Estado: props.client.Estado,
                Contacto: props.client.Contacto,
                Sucursal: props.client.Sucursal,
                Credito: props.client.Credito ? Number(props.client.Credito) : null,
                Telefono: props.client.Telefono,
                Telefono2: props.client.Telefono2,
                Telefono3: props.client.Telefono3,
                Descuento: props.client.Descuento ? Number(props.client.Descuento) : null,
                ManoObra: props.client.ManoObra ? Number(props.client.ManoObra) : null,
            };
            creditoRaw.value = props.client.Credito != null ? String(props.client.Credito) : '';
            descuentoRaw.value = props.client.Descuento != null ? String(props.client.Descuento) : '';
            manoObraRaw.value = props.client.ManoObra != null ? String(props.client.ManoObra) : '';
        } else {
            isEdit.value = false;
            form.value = emptyForm();
            creditoRaw.value = '';
            descuentoRaw.value = '';
            manoObraRaw.value = '';
        }
    }
});

watch(visible, (val) => emits('update:modelValue', val));

const onHide = () => { errors.value = []; };

const onSubmit = async () => {
    if (!form.value.Nombre?.trim()) {
        errors.value = ['El nombre del cliente es obligatorio.'];
        return;
    }

    saving.value = true;
    errors.value = [];

    form.value.Credito = creditoRaw.value !== '' ? parseInt(creditoRaw.value) : null;
    form.value.Descuento = descuentoRaw.value !== '' ? parseFloat(descuentoRaw.value) : null;
    form.value.ManoObra = manoObraRaw.value !== '' ? parseFloat(manoObraRaw.value) : null;

    try {
        const response = isEdit.value
            ? await ClientService.updateClient(props.client!.IdCliente, form.value)
            : await ClientService.createClient(form.value);

        toast.add({
            severity: 'success',
            summary: '¡Listo!',
            detail: isEdit.value ? 'Cliente actualizado correctamente.' : 'Cliente registrado correctamente.',
            life: Number(import.meta.env.VITE_TOAST_LIFETIME),
        });

        emits('saved', response.data);
        visible.value = false;
    } catch (err: any) {
        const data = err?.response?.data;
        if (data && typeof data === 'object') {
            errors.value = Object.values(data).flat() as string[];
        } else {
            errors.value = ['Ocurrió un error al guardar. Intenta de nuevo.'];
        }
    } finally {
        saving.value = false;
    }
};
</script>
