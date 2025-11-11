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
import { UserService } from "@/modules/user/services/UserService";
import type { PasswordRequest } from "@/modules/user/interfaces";

export const useMenu = () => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const { role_name } = user?.role ? user.role : { role_name: undefined };
    const items: Ref<MenuItem[]> = ref<MenuItem[]>([]);
    const asideItems = ref<MenuItem[]>([]);
    const visibleModal = ref<boolean>(false);
    const tools: Ref<ToolResponse[]> = ref<ToolResponse[]>([]);
    const badgeValue: Ref<number> = ref<number>(0);
    const requests = ref<PasswordRequest[]>([]);

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
            items.value.push(
                {
                    label: 'Catálogos',
                    icon: 'pi pi-tags',
                    items: [
                        {
                            label: 'Marca de vehículo',
                            icon: 'pi pi-book',
                            route: '/catalogs/brands'
                        },
                        {
                            label: 'Modelo de la marca',
                            icon: 'pi pi-gauge',
                            route: '/catalogs/models'
                        },
                        {
                            label: 'Proveedor',
                            icon: 'pi pi-users',
                            route: '/catalogs/providers'
                        },
                        {
                            label: 'Refacción',
                            icon: 'pi pi-cog',
                            route: '/catalogs/parts'
                        },
                        {
                            label: 'Paquete',
                            icon: 'pi pi-box',
                            route: '/catalogs/package'
                        },
                        {
                            label: 'Cliente',
                            icon: 'pi pi-user',
                            route: '/catalogs/client'
                        },
                        {
                            label: 'Precio',
                            icon: 'pi pi-dollar',
                            route: '/catalogs/price'
                        },
                        {
                            label: 'Origen de recursos',
                            icon: 'pi pi-money-bill',
                            route: '/catalogs/resources'
                        },
                        {
                            label: 'Verificación de vehículo',
                            icon: 'pi pi-car',
                            route: '/catalogs/verify-car'
                        },
                    ]
                },
                {
                    label: 'Consulta',
                    icon: 'pi pi-search',
                    items: [
                        {
                            label: 'Orden de entrada',
                            icon: 'pi pi-file-import',
                            route: '/consult/in-orders'
                        },
                        {
                            label: 'Imágenes',
                            icon: 'pi pi-image',
                            route: '/consult/images'
                        },
                        {
                            label: 'Compras',
                            icon: 'pi pi-tags',
                            route: '/consult/buy'
                        },
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/consult/parts'
                        },
                        {
                            label: 'Servicios',
                            icon: 'pi pi-briefcase',
                            route: '/consult/services'
                        },
                    ]
                },
                {
                    label: 'Nóminas',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Periodos de nómina',
                            icon: 'pi pi-calendar',
                            route: '/nomina/periodo-nomina'
                        },
                        {
                            label: 'Personal',
                            icon: 'pi pi-users',
                            route: '/nomina/personal'
                        },
                        {
                            label: 'Generación de nómina',
                            icon: 'pi pi-sync',
                            route: '/nomina/genera-nomina'
                        },
                        {
                            label: 'Cálculo de nómina',
                            icon: 'pi pi-calculator',
                            route: '/nomina/calcula-nomina'
                        },
                        {
                            label: 'Reporte de nómina',
                            icon: 'pi pi-file-export',
                            route: '/nomina/reporte-nomina'
                        },
                        {
                            label: 'Cierre de nómina',
                            icon: 'pi pi-check',
                            route: '/nomina/cierre-nomina'
                        },
                    ]
                },
                {
                    label: 'Procesos',
                    icon: 'pi pi-cog',
                    items: [
                        {
                            label: 'Servicio',
                            icon: 'pi pi-wrench',
                            route: '/processes/service'
                        },
                        {
                            label: 'Entradas y salidas',
                            icon: 'pi pi-arrow-right-arrow-left',
                            route: '/processes/entries-exits'
                        },
                        {
                            label: 'Cuentas por cobrar',
                            icon: 'pi pi-money-bill',
                            route: '/processes/accounts-receivable'
                        },
                        {
                            label: 'Registro de pagos',
                            icon: 'pi pi-dollar',
                            route: '/processes/payment-registration'
                        },
                        {
                            label: 'Cierre mensual de caja',
                            icon: 'pi pi-check-circle',
                            route: '/processes/monthly-close'
                        },
                        {
                            label: 'Servicios complementarios',
                            icon: 'pi pi-cog',
                            route: '/processes/supplementary-services'
                        },
                        {
                            label: 'Registro de imágenes',
                            icon: 'pi pi-image',
                            route: '/processes/image-registration'
                        },
                        {
                            label: 'Registro de cobros',
                            icon: 'pi pi-receipt',
                            route: '/processes/image-registration'
                        },
                        {
                            label: 'Otros egresos e ingresos',
                            icon: 'pi pi-arrow-right-arrow-left',
                            route: '/processes/other-income-expenses'
                        },
                        {
                            label: 'Registro diagnóstico',
                            icon: 'pi pi-check',
                            route: '/processes/diagnostic-registration'
                        },
                        {
                            label: 'Generación de Excel',
                            icon: 'pi pi-file-excel',
                            route: '/processes/excel-generation'
                        },
                        {
                            label: 'Reg. sec. facturas',
                            icon: 'pi pi-file-plus',
                            route: '/processes/invoice-registration'
                        },
                        {
                            label: 'Alarma autorizaciones',
                            icon: 'pi pi-bell',
                            route: '/processes/authorization-alarm'
                        },
                    ]
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-chart-bar',
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
                            label: 'Egresos e ingresos',
                            icon: 'pi pi-arrow-right-arrow-left',
                            route: '/reports/expenses-income'
                        },
                        {
                            label: 'Saldo caja',
                            icon: 'pi pi-dollar',
                            route: '/reports/cash-balance'
                        },
                        {
                            label: 'Cuentas por pagar',
                            icon: 'pi pi-dollar',
                            route: '/reports/accounts-payable'
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
                        },
                        {
                            label: 'Reporte almacen facturas',
                            icon: 'pi pi-file-check',
                            route: '/reports/invoice-storage-report'
                        },
                    ]
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
                    icon: 'pi pi-chart-bar',
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
                    label: 'Catálogos',
                    icon: 'pi pi-tags',
                    items: [
                        {
                            label: 'Proveedor',
                            icon: 'pi pi-users',
                            route: '/catalogos/proveedores'
                        },
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/catalogos/refacciones'
                        },
                        {
                            label: 'Paquete',
                            icon: 'pi pi-box',
                            route: '/catalogos/packages'
                        },
                        {
                            label: 'Origen de recursos',
                            icon: 'pi pi-dollar',
                            route: '/catalogos/origen-recursos'
                        },
                        {
                            label: 'Verificación de autos',
                            icon: 'pi pi-car',
                            route: '/catalogos/verificacion-autos'
                        },
                    ],
                },
                {
                    label: 'Consultas',
                    icon: 'pi pi-search',
                    items: [
                        {
                            label: 'Ordenes de entrada',
                            icon: 'pi pi-file-import',
                            route: '/consultas/ordenes-entrada'
                        },
                        {
                            label: 'Imágenes',
                            icon: 'pi pi-image',
                            route: '/consultas/imagenes'
                        },
                        {
                            label: 'Compras',
                            icon: 'pi pi-wallet',
                            route: '/consultas/compras'
                        },
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/consultas/refacciones'
                        },
                        {
                            label: 'Servicios',
                            icon: 'pi pi-file-check',
                            route: '/consultas/servicios'
                        },
                    ]
                },
                {
                    label: 'Nóminas',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Periodos de nómina',
                            icon: 'pi pi-calendar-times',
                            route: '/nominas/periodos-nomina'
                        },
                        {
                            label: 'Personal',
                            icon: 'pi pi-users',
                            route: '/nominas/personal'
                        },
                        {
                            label: 'Generar nómina',
                            icon: 'pi pi-pencil',
                            route: '/nominas/generar-nomina'
                        },
                        {
                            label: 'Calcular nómina',
                            icon: 'pi pi-calculator',
                            route: '/nominas/calcular-nomina'
                        },
                        {
                            label: 'Reporte de nómina',
                            icon: 'pi pi-file',
                            route: '/nominas/reporte-nomina'
                        },
                        {
                            label: 'Cierre de nómina',
                            icon: 'pi pi-times-circle',
                            route: '/nominas/cierre-nomina'
                        },
                    ]
                },
                {
                    label: 'Procesos',
                    icon: 'pi pi-cog',
                    items: [
                        {
                            label: 'Entradas y salidas',
                            icon: 'pi pi-sign-in',
                            route: '/procesos/entradas-salidas'
                        },
                        {
                            label: 'Salidas de almacén',
                            icon: 'pi pi-sign-out',
                            route: '/procesos/salidas-almacen'
                        },
                        {
                            label: 'Registro de pagos',
                            icon: 'pi pi-money-bill',
                            route: '/procesos/registro-pagos'
                        },
                        {
                            label: 'Cierre mensual de caja',
                            icon: 'pi pi-check-circle',
                            route: '/procesos/cierre-mensual-caja'
                        },
                        {
                            label: 'Registro de imágenes',
                            icon: 'pi pi-image',
                            route: '/procesos/registro-imagenes'
                        },
                        {
                            label: 'Otros ingresos y egresos',
                            icon: 'pi pi-money-bill',
                            route: '/procesos/otros-ingresos-egresos'
                        },
                        {
                            label: 'Registro de diagnóstico',
                            icon: 'pi pi-money-bill',
                            route: '/procesos/registro-diagnostico'
                        },
                    ]
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-chart-bar',
                    items: [
                        {
                            label: 'Refacciones',
                            icon: 'pi pi-wrench',
                            route: '/reports/refactions'
                        },
                        {
                            label: 'Entradas/Salidas',
                            icon: 'pi pi-arrow-right-arrow-left',
                            route: '/reports/entries-exits'
                        },
                        {
                            label: 'Insumos OE',
                            icon: 'pi pi-shop',
                            route: '/reports/insumos'
                        },
                        {
                            label: 'Saldo caja',
                            icon: 'pi pi-dollar',
                            route: '/reports/cash-balance'
                        },
                        {
                            label: 'Cuentas por pagar',
                            icon: 'pi pi-file-check',
                            route: '/reports/accounts-payable'
                        },
                        {
                            label: 'Reporte almacen facturas',
                            icon: 'pi pi-file',
                            route: '/reportes/reporte-almacen-facturas'
                        },
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
                if (data.count > 0) {
                    toast.add({ severity: 'info', summary: 'Notificación', detail: `Tienes ${data.count} nuevas solicitudes de cambio de contraseña`, life: import.meta.env.VITE_TOAST_LIFETIME });

                    UserService.passwordRequests('notifications')
                        .then(({ data }) => {
                            requests.value = data;
                        })
                }
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
        toggleNotification,
        requests
    }
}