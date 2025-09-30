export interface MenuItem {
    label?: string;
    icon?: string;
    badge?: number;
    items?: MenuItem[];
    separator?: boolean;
    shortcut?: string;
    url?: string;
}