import { ref } from "vue"
import type { AxiosError } from "axios";
import { useConfirm, useToast } from "primevue";
import type { ModelRequest, ModelResponse } from "../interfaces"
import { ModelService } from "../services/ModelService"
import { BrandService } from "../../brands/services/BrandService";
import type { Brand } from "../../brands/interfaces";


export const useModels = () => {
    const models = ref<Array<ModelResponse>>([]);
    const brands = ref<Array<Brand>>([]);

    const isLoadingModels = ref<boolean>(false);
    const showAddModelDialog = ref<boolean>(false);
    const isLoadingSaveModel = ref<boolean>(false);

    const model = ref<ModelRequest>({} as ModelRequest);

    const toast = useToast();
    const confirm = useConfirm();

    const initData = (): void => {
        loadModels();
        getBrands();
    }

    const loadModels = (): void => {
        isLoadingModels.value = true;

        ModelService.getModels()
            .then(({ data }) => {
                models.value = data
            })
            .finally(() => {
                isLoadingModels.value = false
            });
    }

    const onAddModel = (): void => {
        showAddModelDialog.value = true;
    }

    const getBrands = (): void => {
        BrandService.getBrands()
            .then(({ data }) => {
                brands.value = data
            });
    }

    const saveData = (): void => {
        isLoadingSaveModel.value = true;
        const { value } = model;

        ModelService.createModel(value)
            .then(() => {
                models.value.push({ Marca: value.Marca.Marca, Modelo: value.Modelo });
                toast.add({ severity: 'success', summary: 'Modelo creado', detail: `Modelo ${value.Modelo} creado correctamente para la marca ${value.Marca.Marca}`, life: import.meta.env.VITE_TOAST_LIFETIME });
                isLoadingSaveModel.value = false;
            })
            .catch(({ response }: AxiosError<{ Modelo: string[] }>) => {
                toast.add({ severity: 'error', summary: 'Error', detail: response?.data.Modelo[0], life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .finally(() => {
                showAddModelDialog.value = false
                model.value = {} as ModelRequest;
            });
    }


    const confirm2 = (event: any, data: ModelResponse) => {
        confirm.require({
            target: event.currentTarget,
            message: `¿Está seguro de que desea eliminar el modelo ${data.Modelo} de la marca ${data.Marca}?`,
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
                ModelService.deleteModel(data)
                    .then(() => {
                        models.value = models.value.filter(m => !(m.Marca === data.Marca && m.Modelo === data.Modelo));
                        toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Registro eliminado', life: import.meta.env.VITE_TOAST_LIFETIME });
                    })
                    .catch(({ response }: AxiosError<{ message: string }>) => {
                        toast.add({ severity: 'error', summary: 'Error', detail: response?.data.message, life: import.meta.env.VITE_TOAST_LIFETIME });
                    });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Has cancelado la acción', life: import.meta.env.VITE_TOAST_LIFETIME });
            }
        });
    };

    return {
        models,
        isLoadingModels,
        isLoadingSaveModel,
        showAddModelDialog,
        onAddModel,
        brands,
        initData,
        model,
        saveData,
        confirm2,
    }
}