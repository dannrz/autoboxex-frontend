import type { FormRegister, ServiceType } from "@/modules/register/interfaces";
import { RegisterService } from "@/modules/register/services/registerService";
import { useFormStore } from "@/stores/useFormStore";
import { useToast } from "primevue";
import { ref } from "vue"

export const useForm = () => {
    const toast = useToast();
    const formStore = useFormStore();

    const items = ref<string[]>([]);
    const form = ref<FormRegister>({} as FormRegister);
    const lists = ref<Array<ServiceType[]>>([]);
    const isLoadingTipos = ref<boolean>(false);
    const isLoadingStates = ref<boolean>(false);

    const search = (event: { query: string }) => {
        items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    const onClear = (): void => {
        form.value = {} as FormRegister;
        toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
    }

    const onSubmit = (): void => {
        console.log(form.value);
    }

    const fetchLists = (): void => {
        if (formStore.$state.tipoServicios.length > 0) {
            lists.value[0] = formStore.$state.tipoServicios;
            return;
        }
        isLoadingTipos.value = true;
        RegisterService.serviceType()
            .then(({ data }): void => {
                formStore.$state.tipoServicios = data;
                lists.value[0] = data;
            })
            .finally(() => {
                isLoadingTipos.value = false;
            });

        if (formStore.$state.state.length > 0) {
            lists.value[1] = formStore.$state.state;
            return;
        }
        isLoadingStates.value = true;
        RegisterService.states()
            .then(({ data }): void => {
                formStore.$state.state = data;
                lists.value[1] = data;
            })
            .finally(() => {
                isLoadingStates.value = false;
            });
    }

    return {
        items,
        form,
        search,
        onSubmit,
        onClear,
        fetchLists,
        lists,
        isLoadingTipos,
        isLoadingStates,
    }
}