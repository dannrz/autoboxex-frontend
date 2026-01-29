import { ref } from "vue";
import type { Refaccion } from "../interfaces";
import { RefacService } from "../services/RefacService";

export const useRefac = () => {
    const refacciones = ref<Array<Refaccion>>([]);

    const loadRefacciones = async (): Promise<void> => {
        RefacService.getRefacciones()
            .then(({ data }) => {
                refacciones.value = data;
            })
    }

    return {
        loadRefacciones,
        refacciones,
    };
}