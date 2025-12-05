import { ref } from "vue"
import type { ModelResponse } from "../interfaces"
import { ModelService } from "../services/ModelService"

export const useModels = () => {
    const models = ref<Array<ModelResponse>>([]);
    const isLoadingModels = ref<boolean>(false);

    const loadModels = () => {
        isLoadingModels.value = true;

        ModelService.getModels()
            .then(({ data }) => {
                models.value = data
            })
            .finally(() => {
                isLoadingModels.value = false
            });
    }

    return {
        models,
        loadModels,
        isLoadingModels,
    }
}