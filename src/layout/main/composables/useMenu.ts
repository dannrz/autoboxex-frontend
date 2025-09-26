import type { User } from "@/layout/login/interfaces";
import type { MenuItem } from "primevue/menuitem";
import { ref, type Ref } from "vue";
import { Roles } from "../interfaces";
import { toolsService } from "@/modules/tools/services/ToolsService";
import type { ToolResponse } from "@/modules/tools/interfaces/ToolResponse.interface";
import type { AxiosError } from "axios";
import { useToast } from "primevue";
import { useToolStore } from "@/stores/useToolStore";
import { MenuService } from "../services/MenuService";

export const useMenu = () => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const { role_name } = user?.role ? user.role : { role_name: undefined };
    const items: Ref<MenuItem[]> = ref<MenuItem[]>([]);
    const asideItems = ref<MenuItem[]>([]);
    const visibleModal = ref<boolean>(false);
    const tools: Ref<ToolResponse[]> = ref<ToolResponse[]>([]);
    const badgeValue: Ref<number> = ref<number>(0);

    const toast = useToast()
    const toolsStore = useToolStore();

    items.value = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            route: '/'
        },
    ];
    switch (role_name) {
        case Roles.Admin:
            items.value.push({
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
                }
            );

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
        case Roles.Capturista:
            break;
        case Roles.Abc:
            break;
        case Roles.Analisec:
            break;
        case Roles.Administrativo:
            items.value.push(
                {
                    label: 'Catálogos',
                    icon: 'pi pi-book',
                    items: [
                        {
                            label: 'Marcas de vehículos',
                            icon: 'pi pi-car',
                            route: '/brands'
                        },
                        {
                            label: 'Modelos de vehículos',
                            icon: 'pi pi-truck',
                            route: '/models'
                        },
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/refacs'
                        },
                        {
                            label: 'Paquete',
                            icon: 'pi pi-box',
                            route: '/packages'
                        },
                        {
                            label: 'Cliente',
                            icon: 'pi pi-users',
                            route: '/clients'
                        },
                        {
                            label: 'Precio',
                            icon: 'pi pi-money-bill',
                            route: '/prices'
                        }
                    ]
                },
                {
                    label: 'Consultas',
                    icon: 'pi pi-search',
                    items: [
                        {
                            label: 'Imágenes',
                            icon: 'pi pi-image',
                            route: '/consultas/images'
                        },
                        {
                            label: 'Compras',
                            icon: 'pi pi-shopping-bag',
                            route: '/consultas/buys'
                        },
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/consultas/refacs'
                        },
                        {
                            label: 'Servicios',
                            icon: 'pi pi-bolt',
                            route: '/consultas/services'
                        }
                    ]
                },
                {
                    label: 'Procesos',
                    icon: 'pi pi-cog',
                    items: [
                        {
                            label: 'Servicio',
                            icon: 'pi pi-car',
                            route: '/processes/service'
                        },
                        {
                            label: 'Cuentas por cobrar',
                            icon: 'pi pi-dollar',
                            route: '/processes/counts'
                        },
                        {
                            label: 'Servicios complementarios',
                            icon: 'pi pi-briefcase',
                            route: '/processes/complementary-services'
                        },
                        {
                            label: 'Registro de imágenes',
                            icon: 'pi pi-image',
                            route: '/processes/image-registration'
                        },
                        {
                            label: 'Registro de cobros',
                            icon: 'pi pi-file-edit',
                            route: '/processes/register'
                        },
                        {
                            label: 'Registro diagnóstico',
                            icon: 'pi pi-check',
                            route: '/processes/diagnostic'
                        },
                        {
                            label: 'Generación de Excel',
                            icon: 'pi pi-file-excel',
                            route: '/processes/excel'
                        },
                        {
                            label: 'Facturas',
                            icon: 'pi pi-receipt',
                            route: '/processes/invoices'
                        },
                    ]
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-file-export',
                    items: [
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/reports/refactions'
                        },
                        {
                            label: 'Entradas / Salidas',
                            icon: 'pi pi-arrow-right-arrow-left',
                            route: '/reports/entries-exits'
                        },
                        {
                            label: 'Insumos',
                            icon: 'pi pi-box',
                            route: '/reports/insumos'
                        },
                        {
                            label: 'Presupuesto de servicios',
                            icon: 'pi pi-wallet',
                            route: '/reports/services-budget'
                        },
                        {
                            label: 'Prefactura',
                            icon: 'pi pi-receipt',
                            route: '/reports/prefactura'
                        },
                        {
                            label: 'Órdenes de entrada cobradas',
                            icon: 'pi pi-check-circle',
                            route: '/reports/entry-orders-charged'
                        },
                        {
                            label: 'OE cobradas por cliente',
                            icon: 'pi pi-dollar',
                            route: '/reports/entry-orders-client'
                        },
                        {
                            label: 'Relación de cobranza',
                            icon: 'pi pi-money-bill',
                            route: '/reports/collection-report'
                        },
                        {
                            label: 'Órdenes de entrada',
                            icon: 'pi pi-file-import',
                            route: '/reports/entry-orders'
                        }
                    ]
                }
            );
            break;
        case Roles.Almacen:
            items.value.push(
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
            );
            break;
        case Roles.JefeTaller:
        case Roles.User:
    }

    items.value.push(
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
        });

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

    const overlayBadge = async (): Promise<void> => {
        MenuService.getOverlayBadge()
            .then(({ data }) => {
                badgeValue.value = data.count;
            })
            .catch((error: AxiosError) => {
                if (error.status === 401) {
                    toast.add({ severity: 'error', summary: 'Acceso no autorizado', detail: 'No cuenta con los permisos necesarios para acceder al recurso', life: import.meta.env.VITE_TOAST_LIFETIME });
                }
                badgeValue.value = 0;
            });
    }

    const op = ref();
    const op2 = ref();

    const toggle = (event: MouseEvent) => {
        op.value.toggle(event);
    }

    const toggleNotification = (event: MouseEvent) => {
        op2.value.toggle(event);
    }

    return {
        items,
        asideItems,
        visibleModal,
        tools,
        overlayBadge,
        badgeValue,
        op,
        op2,
        toggle,
        toggleNotification
    }
}