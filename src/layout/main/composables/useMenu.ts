import type { MenuItem } from "primevue/menuitem";
import { ref, type Ref } from "vue";

export const useMenu = () => {
    const items: Ref<Array<MenuItem>> = ref<Array<MenuItem>>([
        {
            label: 'Home',
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
    ]);

    const asideItems = ref([
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
    ]);

    return {
        items,
        asideItems
    }
}