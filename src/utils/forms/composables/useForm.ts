import { ref } from "vue"
import { useToast } from "primevue";
import type { FormRegister, ServiceType } from "@/modules/register/interfaces";
import { RegisterService } from "@/modules/register/services/registerService";
import { useFormStore } from "@/stores/useFormStore";
import type { Clientes } from "@/modules/register/interfaces/Clientes.interface";
import { useClientStore } from "@/stores/useClientStore";

export const useForm = () => {
    const toast = useToast();
    const formStore = useFormStore();
    const clientStore = useClientStore();

    const items = ref<string[]>([]);
    const form = ref<FormRegister>({} as FormRegister);
    const lists = ref<Array<ServiceType[]>>([]);
    const isLoadingTipos = ref<boolean>(false);
    const isLoadingStates = ref<boolean>(false);
    const clientes = ref<Clientes[]>([]);
    const isLoadingClients = ref<boolean>(false);

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

    const onClientChange = (e: Clientes) => {
        RegisterService.getClient(e)
            .then(({ data }): void => {
                form.value.idCliente = String(data.IdCliente);
                form.value.sucursal = data.Sucursal!;
                form.value.rfc = data.RFC!;
                form.value.credito = `${data.Credito!} ${data.Credito! == 1 ? 'día' : 'días'}`;
                form.value.direccion = `${data.Direccion!} ${data.Colonia} ${data.Poblacion} ${data.Estado} ${data.CP}`;
            })
    }

    const fetchLists = (): void => {
        if (formStore.$state.tipoServicios.length > 0) {
            lists.value[0] = formStore.$state.tipoServicios;
            lists.value[1] = formStore.$state.state;
            clientes.value = clientStore.$state.clients;

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

        isLoadingStates.value = true;
        RegisterService.states()
            .then(({ data }): void => {
                formStore.$state.state = data;
                lists.value[1] = data;
            })
            .finally(() => {
                isLoadingStates.value = false;
            });

        isLoadingClients.value = true;
        RegisterService.getClients()
            .then(({ data }): void => {
                clientStore.$state.clients = data;
                clientes.value = data;
            })
            .finally(() => {
                isLoadingClients.value = false;
            });
    }

    return {
        items,
        form,
        search,
        clientes,
        onSubmit,
        onClear,
        fetchLists,
        lists,
        isLoadingTipos,
        isLoadingStates,
        isLoadingClients,
        onClientChange,
    }
}