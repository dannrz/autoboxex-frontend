import { ref, type Ref } from "vue"
import { useToast } from "primevue";
import { RegisterService } from "@/modules/processes/service/services/registerService";
import type { Clientes, FormRegister, Insumo, ServiceType, Servicio } from "@/modules/processes/service/interfaces";
import { useClientStore, useFormStore, useVehicleStore } from "@/stores";
import { is } from "zod/v4/locales";

export const useForm = () => {
    const toast = useToast();
    const formStore = useFormStore();
    const clientStore = useClientStore();
    const vehicleStore = useVehicleStore();

    const items = ref<string[]>([]);
    const form = ref<FormRegister>({} as FormRegister);
    const lists = ref<Array<ServiceType[]>>([]);
    const clientes = ref<Clientes[]>([]);
    const insumos = ref<Insumo[]>([]);
    const folios = ref<Array<{ FolioOE: string }>>([]);

    const isLoadingTipos: Ref<boolean> = ref<boolean>(false);
    const isLoadingStates: Ref<boolean> = ref<boolean>(false);
    const isLoadingPlacas: Ref<boolean> = ref<boolean>(false);
    const isLoadingClients: Ref<boolean> = ref<boolean>(false);
    const isLoadingInsumos: Ref<boolean> = ref<boolean>(false);
    const isLoadingFolios: Ref<boolean> = ref<boolean>(false);
    const isLoadingForm: Ref<boolean> = ref<boolean>(false);

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
        isLoadingPlacas.value = true;
        form.value = {} as FormRegister;

        RegisterService.getClient(e)
            .then(({ data }): void => {
                form.value.idCliente = String(data.IdCliente);
                form.value.sucursal = data.Sucursal!;
                form.value.rfc = data.RFC!;
                form.value.credito = `${data.Credito!} ${data.Credito! == '1' ? 'día' : 'días'}`;
                form.value.direccion = data.direccionFull!;
                form.value.servicios = data.servicios;

                let listPlacas: Array<{ Placas: string }> = [];
                data.servicios.forEach((service) => {
                    listPlacas.push({ Placas: service.vehiculo.Placas });
                });
                form.value.placasList = listPlacas;
            })
            .finally(() => {
                isLoadingPlacas.value = false;
            });
    }

    const onPlacasChange = (placas: string, emits: (evt: "insumos", value: Insumo[]) => void) => {
        const servicio: Servicio | undefined = form.value.servicios.find((service: Servicio | undefined) => service!.vehiculo.Placas === placas);
        isLoadingInsumos.value = true;

        RegisterService.getInsumos(servicio!)
            .then(({ data }) => {
                data.map((insumo: Insumo) => {
                    insumo.Importe = (Number(insumo.PrecioIva) * Number(insumo.Cantidad)).toFixed(2);
                    return insumo;
                });
                insumos.value = data;
                emits('insumos', data);
            })
            .finally(() => isLoadingInsumos.value = false);

        form.value.marca = servicio!.vehiculo.marca.Marca;
        form.value.modelo = servicio!.vehiculo.Modelo;
        form.value.year = servicio!.vehiculo.Año;
        form.value.color = servicio!.vehiculo.Color!;
        form.value.serie = servicio!.vehiculo.Serie!;
        form.value.kilometraje = servicio!.Kms!;

        form.value.ordenEntrada = servicio!.FolioOE;
        form.value.fechaEntrada = new Date(servicio!.FEntrada!);
    }

    const onSelectedFolio = (folio: { FolioOE: string }, emit: ((evt: "insumos", value: Insumo[]) => void) & ((evt: "loader", value: boolean) => void)) => {
        isLoadingForm.value = true;
        emit('loader', true);

        RegisterService.getClientAndVehicle(Number(folio.FolioOE))
            .then(({ data }) => {
                form.value.idCliente = String(data.IdCliente);

                const clienteSeleccionado = clientes.value.find(c => c.Nombre === data.Nombre);
                if (clienteSeleccionado) {
                    form.value.cliente = clienteSeleccionado;
                }

                form.value.sucursal = data.Sucursal!;
                form.value.rfc = data.RFC!;
                form.value.credito = `${data.Credito!} ${data.Credito! == '1' ? 'día' : 'días'}`;
                form.value.direccion = data.direccionFull!;

                const servicio = data.servicios[0];
                form.value.marca = servicio.vehiculo.marca.Marca;
                form.value.modelo = servicio.vehiculo.Modelo;
                form.value.year = servicio.vehiculo.Año;
                form.value.color = servicio.vehiculo.Color!;
                form.value.serie = servicio.vehiculo.Serie!;
                form.value.kilometraje = servicio.Kms!;

                RegisterService.getInsumos({ IdMovimiento: servicio.IdMovimiento } as Servicio)
                    .then(({ data }) => {
                        emit('insumos', data);
                    })
                    .finally(() => {
                        emit('loader', false);
                    });

                RegisterService.getPlacas(data.IdCliente)
                    .then(({ data }) => {
                        form.value.placasList = data;

                        const currentPlate = form.value.placasList.find(p => p.Placas === servicio.vehiculo.Placas);
                        if (currentPlate) {
                            form.value.placas = { Placas: currentPlate.Placas };
                        }
                    })


                form.value.fechaEntrada = new Date(servicio.FEntrada!);

            })
            .finally(() => {
                isLoadingForm.value = false;
            });
    }

    const fetchLists = (): void => {
        if (formStore.$state.tipoServicios.length > 0) {
            lists.value[0] = formStore.$state.tipoServicios;
            lists.value[1] = formStore.$state.state;
            clientes.value = clientStore.$state.clients;
            folios.value = vehicleStore.$state.inOrders;

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

        isLoadingFolios.value = true;
        RegisterService.getInOrders()
            .then(({ data }) => {
                vehicleStore.$state.inOrders = data;
                folios.value = data;
            })
            .finally(() => {
                isLoadingFolios.value = false;
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
        isLoadingPlacas,
        isLoadingFolios,
        isLoadingForm,
        onClientChange,
        onPlacasChange,
        insumos,
        isLoadingInsumos,
        folios,
        onSelectedFolio,
    }
}