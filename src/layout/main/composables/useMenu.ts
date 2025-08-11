import type { User } from "@/layout/login/interfaces";
import type { MenuItem } from "primevue/menuitem";
import { ref, type Ref } from "vue";
import { Roles } from "../interfaces";

export const useMenu = () => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const { role_name } = user?.role ? user.role : { role_name: undefined };
    const items: Ref<MenuItem[]> = ref<MenuItem[]>([]);
    const asideItems = ref<MenuItem[]>([]);

    switch (role_name) {
        case Roles.Admin:
            items.value = [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    route: '/'
                },
                {
                    label: 'Registro',
                    icon: 'pi pi-star',
                    route: '/register'
                },
                {
                    label: 'Projects',
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
                    label: 'Contact',
                    icon: 'pi pi-envelope'
                }
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
            ];
            break;
    }

    return {
        items,
        asideItems
    }
}