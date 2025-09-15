import type { User } from "@/layout/login/interfaces";
import type { MenuItem } from "primevue/menuitem";
import { ref, type Ref } from "vue";
import { Roles } from "../interfaces";
import { toolsService } from "@/modules/tools/services/ToolsService";
import type { ToolResponse } from "@/modules/tools/interfaces/ToolResponse.interface";
import type { AxiosError } from "axios";
import { useToast } from "primevue";
import { useToolStore } from "@/stores/useToolStore";

export const useMenu = () => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const { role_name } = user?.role ? user.role : { role_name: undefined };
    const items: Ref<MenuItem[]> = ref<MenuItem[]>([]);
    const asideItems = ref<MenuItem[]>([]);
    const visibleModal = ref<boolean>(false);
    const tools: Ref<ToolResponse[]> = ref<ToolResponse[]>([]);

    const toast = useToast()
    const toolsStore = useToolStore();

    switch (role_name) {
        case Roles.Admin:
            items.value = [
                {
                    label: 'Inicio',
                    icon: 'pi pi-home',
                    route: '/'
                },
                {
                    label: 'Catálogos',
                    icon: 'pi pi-tags',
                    items: [
                        {
                            label: 'Clientes',
                            icon: 'pi pi-users',
                            route: '/clientes'
                        },
                        {
                            label: 'Vehículos',
                            icon: 'pi pi-car',
                            route: '/vehiculos'
                        },
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/spare'
                        },
                        {
                            label: 'Paquetes',
                            icon: 'pi pi-box',
                            route: '/paquetes'
                        },
                    ]
                },
                {
                    label: 'Consultas',
                    icon: 'pi pi-search',
                    items: [
                        {
                            label: 'Compras',
                            icon: 'pi pi-car',
                            route: '/vehicles'
                        },
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/proveedores'
                        },
                        {
                            label: 'Servicios',
                            icon: 'pi pi-users',
                            route: '/servicios'
                        },
                    ]

                },
                {
                    label: 'Procesos',
                    icon: 'pi pi-sync',
                    items: [
                        {
                            label: 'Servicio',
                            icon: 'pi pi-car',
                            route: '/register'
                        },
                        {
                            label: 'Cuentas por cobrar',
                            icon: 'pi pi-car',
                        },
                        {
                            label: 'Servicios complementarios',
                            icon: 'pi pi-car',
                        },
                        {
                            label: 'Registro de cobros',
                            icon: 'pi pi-car',
                        },
                        {
                            label: 'Registro diagnóstico',
                            icon: 'pi pi-car',
                        },
                        {
                            label: 'Generación de excel',
                            icon: 'pi pi-car',
                        },
                        {
                            label: 'Reg. Sec. Facturas',
                            icon: 'pi pi-car',
                        },
                    ]
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-file',
                    route: '/tablas'

                },
                {
                    label: 'Ventas',
                    icon: 'pi pi-credit-card',
                    route: '/tablas'

                },
                {
                    label: 'Articulos en almacen',
                    icon: 'pi pi-box',
                    command(event) {
                        toolsData()
                    },
                },
                {
                    label: 'Administrar usuarios',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Lista de Usuarios',
                            icon: 'pi pi-user',
                            route: '/users'
                        },
                        {
                            label: 'Solicitudes de cambios de contraseña',
                            icon: 'pi pi-lock',
                            route: '/password-requests'
                        }
                    ]
                },
            ];

            asideItems.value = [
                {
                    label: 'Files',
                    icon: 'pi pi-file',
                    items: [
                        {
                            label: 'Documents',
                            icon: 'pi pi-file',
                            items: [
                                {
                                    label: 'Invoices',
                                    icon: 'pi pi-file-pdf',
                                    items: [
                                        {
                                            label: 'Pending',
                                            icon: 'pi pi-stop'
                                        },
                                        {
                                            label: 'Paid',
                                            icon: 'pi pi-check-circle'
                                        }
                                    ]
                                },
                                {
                                    label: 'Clients',
                                    icon: 'pi pi-users'
                                }
                            ]
                        },
                        {
                            label: 'Images',
                            icon: 'pi pi-image',
                            items: [
                                {
                                    label: 'Logos',
                                    icon: 'pi pi-image'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Cloud',
                    icon: 'pi pi-cloud',
                    items: [
                        {
                            label: 'Upload',
                            icon: 'pi pi-cloud-upload'
                        },
                        {
                            label: 'Download',
                            icon: 'pi pi-cloud-download'
                        },
                        {
                            label: 'Sync',
                            icon: 'pi pi-refresh'
                        }
                    ]
                },
                {
                    label: 'Devices',
                    icon: 'pi pi-desktop',
                    items: [
                        {
                            label: 'Phone',
                            icon: 'pi pi-mobile'
                        },
                        {
                            label: 'Desktop',
                            icon: 'pi pi-desktop'
                        },
                        {
                            label: 'Tablet',
                            icon: 'pi pi-tablet'
                        }
                    ]
                }
            ];
            break;
        case Roles.User:
            // User specific menu items
            break;
        case Roles.Guest:
            // Guest specific menu items
            break;
        case Roles.Almacen:
            items.value = [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    route: '/'
                },
                {
                    label: 'Almacen',
                    icon: 'pi pi-inbox',
                    route: '/almacen'
                },
                {
                    label: 'Herramientas',
                    icon: 'pi pi-search',
                    items: [
                        {
                            label: 'Components',
                            icon: 'pi pi-bolt'
                        },
                        {
                            label: 'Blocks',
                            icon: 'pi pi-server'
                        },
                        {
                            label: 'UI Kit',
                            icon: 'pi pi-pencil'
                        },
                        {
                            label: 'Templates',
                            icon: 'pi pi-palette',
                            items: [
                                {
                                    label: 'Apollo',
                                    icon: 'pi pi-palette'
                                },
                                {
                                    label: 'Ultima',
                                    icon: 'pi pi-palette'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Articulos en almacen',
                    icon: 'pi pi-box',
                    command(event) {
                        toolsData()
                    },
                }
            ];
            break;
    }

    const toolsData = () => {
        if (toolsStore.$state.tools.length > 0) {
            tools.value = toolsStore.$state.tools;
            visibleModal.value = true;

            return;
        }

        toolsService().then(({ data }): void => {
            toolsStore.$state.tools = data;
            tools.value = data;

            visibleModal.value = true;
        })
            .catch((error: AxiosError): void => {
                if (error.status === 401) {
                    visibleModal.value = false;
                    toast.add({ severity: 'error', summary: 'Acceso no autorizado', detail: 'No cuenta con los permisos necesarios para acceder al recurso', life: import.meta.env.VITE_TOAST_LIFETIME });
                }
            })
    }

    return {
        items,
        asideItems,
        visibleModal,
        tools,
    }
}