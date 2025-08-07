import { ref, type Ref } from "vue";
import type { MenuItem } from "../interfaces";

export const useMenu = () => {
    const items: Ref<Array<MenuItem>> = ref<Array<MenuItem>>([
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            badge: 3,
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B'
                },
                {
                    separator: true
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U'
                }
            ]
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