import { ref } from "vue";
import { useConfirm, useToast } from "primevue";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import type { FormSubmitEvent } from '@primevue/forms';
import { z } from 'zod';
import type { Refaccion, RefaccionColumns } from "../interfaces";
import { RefacService } from "../services/RefacService";


export const useRefac = () => {
    const refacciones = ref<Array<Refaccion>>([]);
    const showDialog = ref<boolean>(false);
    const isCreating = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const titleDialog = ref<string>("");
    const refaccion = ref<Refaccion>({} as Refaccion);

    const confirm = useConfirm();
    const toast = useToast();

    const columns: RefaccionColumns = {
        IdRefaccion: 'ID',
        Refacción: 'Refacción',
        Unidad: 'Unidad',
        Codigo: 'Código',
        Tipo: 'Tipo',
        Cantidad: 'Cantidad',
        Precio: 'Precio',
        Fecha: 'Fecha',
        Marca: 'Marca',
        Calidad: 'Calidad',
        PrecioIva: 'Precio con IVA',
    }

    const unidades: Array<string> = [
        'Pieza',
        'Litro',
        'Galón',
        'Juego',
        'Servicio',
    ];

    const tipos: Array<string> = [
        'Refaccion',
        'Servicio',
        'Consumible',
    ];

    const calidades: Array<string> = [
        'Excelente',
        'Buena',
        'Regular',
        'Mala',
    ];

    const loadRefacciones = async (): Promise<void> => {
        RefacService.getRefacciones()
            .then(({ data }) => {
                refacciones.value = data;
            })
    }

    const handleEdit = (refaccion1: Refaccion): void => {
        isCreating.value = false;
        showDialog.value = true;
        titleDialog.value = "Editar Refacción";
        refaccion.value = refaccion1;
    }

    const handleDelete = (refaccion: Refaccion): void => {
        confirm.require({
            message: `¿Está seguro de que desea eliminar la refacción ${refaccion.Refacción}?`,
            icon: 'pi pi-info-circle',
            rejectProps: {
                label: 'Cancelar',
                severity: 'secondary',
                text: true,
                raised: true
            },
            acceptProps: {
                label: 'Sí, borrar',
                severity: 'danger',
                outlined: true
            },
            accept: () => {
                RefacService.deleteRefaccion(refaccion)
                    .then(() => {
                        refacciones.value = refacciones.value.filter(r => r.IdRefaccion !== refaccion.IdRefaccion);
                        toast.add({ severity: 'success', summary: 'Eliminado', detail: 'La refacción ha sido eliminada', life: import.meta.env.VITE_TOAST_LIFETIME });
                    })
                    .catch((error) => {
                        console.error('Error al eliminar refacción:', error);
                        toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al eliminar la refacción', life: import.meta.env.VITE_TOAST_LIFETIME });
                    });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Has cancelado la acción', life: import.meta.env.VITE_TOAST_LIFETIME });
            }
        });
    }

    const handleCreate = (): void => {
        isCreating.value = true;
        showDialog.value = true;
        titleDialog.value = "Crear Refacción";
        refaccion.value = {} as Refaccion;

        RefacService.getLastId()
            .then(({ data }) => {
                refaccion.value.IdRefaccion = data.last;
            });
    }

    const saveData = (): void => {

    }

    const updatePrecioIva = (precio: number): void => {
        const iva = precio * 0.16;

        refaccion.value.PrecioIva = precio + iva;
    }

    const resolver = ref<any>(zodResolver(
        z.object({
            Refaccion: z.string().min(1, { message: 'La refacción es requerida.' }).nonempty({ message: 'La refacción es requerida.' }),
            Unidad: z.string().min(1, { message: 'La unidad es requerida.' }),
            Codigo: z.number().min(1, { message: 'El código es requerido.' }),
            Tipo: z.string().min(1, { message: 'El tipo es requerido.' }),
            Cantidad: z.number().min(1, { message: 'La cantidad es requerida.' }),
            Precio: z.number().min(1, { message: 'El precio es requerido.' }),
            Marca: z.string().min(1, { message: 'La marca es requerida.' }),
            Calidad: z.string().min(1, { message: 'La calidad es requerida.' }),
        })
    ));

    const submit = (event: FormSubmitEvent<Record<string, any>>) => {
        if (isCreating.value) {
            createRefaccion();
            return
        }

        update();
    }

    const update = (): void => {
        RefacService.updateRefaccion(refaccion.value)
            .then(({ data }) => {
                const index = refacciones.value.findIndex(r => r.IdRefaccion === data.IdRefaccion);
                if (index !== -1) {
                    refacciones.value[index] = data;
                }
                showDialog.value = false;
            })
            .catch((error) => {
                console.error('Error al actualizar refacción:', error);
                toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .finally(() => {
                isLoading.value = false;
                refaccion.value = {} as Refaccion;
            });
    }

    const createRefaccion = (): void => {
        refaccion.value.Codigo = String(refaccion.value.Codigo);
        isLoading.value = true;

        RefacService.createRefaccion(refaccion.value)
            .then(({ data }) => {
                showDialog.value = false;
                refacciones.value.push(refaccion.value);
            })
            .catch((error) => {
                toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .finally(() => {
                isLoading.value = false;
                refaccion.value = {} as Refaccion;
            });
    }

    const create = () => {
        const form = document.querySelector<HTMLFormElement>('Form')!;

        form.requestSubmit();
    }

    return {
        loadRefacciones,
        refacciones,
        refaccion,
        columns,
        unidades,
        tipos,
        calidades,
        handleEdit,
        handleDelete,
        handleCreate,
        showDialog,
        titleDialog,
        saveData,
        updatePrecioIva,
        isLoading,
        submit,
        create,
        resolver,
    };
}