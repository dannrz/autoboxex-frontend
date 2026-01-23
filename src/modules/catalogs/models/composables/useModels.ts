import { ref } from "vue"
import type { AxiosError } from "axios";
import { useToast } from "primevue";
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
    }
}