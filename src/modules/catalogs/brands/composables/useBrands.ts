import { ref } from "vue"
import type { Brand } from "../interfaces/Brand.interface";
import { BrandService } from "../services/BrandService";
import { useCatalogStore } from "@/stores/useCatalogStore";
import { useConfirm, useToast } from "primevue";

export const useBrands = () => {
    const brands = ref<Brand[]>([]);
    const showAddBrandDialog = ref<boolean>(false);
    const showEditBrandDialog = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const selectedBrand = ref<Brand>({} as Brand);

    const toast = useToast();
    const catalogStore = useCatalogStore();
    const confirm = useConfirm();

    const fetchBrands = () => {
        if (catalogStore.brands.length > 0) {
            brands.value = catalogStore.brands;
            return;
        }

        BrandService.getBrands()
            .then(({ data }): void => {
                brands.value = data;
                catalogStore.brands = data;
            })
    }

    const onSavedBrand = (newBrand: Brand) => {
        BrandService.addBrand(newBrand.Marca)
            .then(({ data }): void => {
                brands.value.push(data);
            })
    }

    const saveBrand = (name: string) => {
        onSavedBrand({ Marca: name } as Brand);
    }

    const hideDialog = () => {
        showAddBrandDialog.value = false;
    }

    const hideEditDialog = () => {
        showEditBrandDialog.value = false;
    }

    const onDeletedBrand = (event: any, brand: Brand) => {
        confirm.require({
            target: event.currentTarget,
            message: `¿Desea proceder con la eliminación de la marca: ${brand.Marca}?`,
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Proceder'
            },
            accept: () => {
                BrandService.deleteBrand(brand)
                    .then(({ data }): void => {
                        brands.value = brands.value.filter(b => b.IdMarca !== brand.IdMarca);
                        catalogStore.$state.brands = brands.value;

                        toast.add({ severity: 'success', summary: 'Éxito', detail: `La marca ${brand.Marca} ha sido eliminada`, life: import.meta.env.VITE_TOAST_LIFETIME });
                    })
                    .catch((): void => {
                        toast.add({ severity: 'error', summary: 'Error', detail: `Ha ocurrido un error al eliminar la marca ${brand.Marca}`, life: import.meta.env.VITE_TOAST_LIFETIME });
                    });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Cancelado', detail: `Has cancelado la eliminación de la marca ${brand.Marca}`, life: import.meta.env.VITE_TOAST_LIFETIME });
            }
        });
    }

    const onEditedBrand = (event: any, brand: Brand) => {
        showEditBrandDialog.value = true;
        selectedBrand.value = brand;
    }

    const onUpdateBrand = (currentBrand: Brand, updatedName: string, dialog: boolean) => {
        isLoading.value = true;
        BrandService.updateBrand(currentBrand, updatedName)
            .then(({ data }): void => {
                const index = brands.value.findIndex(b => b.IdMarca === currentBrand.IdMarca);
                if (index !== -1) {
                    brands.value[index] = data;
                    catalogStore.$state.brands = brands.value;
                }

                toast.add({ severity: 'success', summary: 'Éxito', detail: `La marca ${currentBrand.Marca} ha sido actualizada a ${data.Marca}`, life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .finally((): void => {
                showEditBrandDialog.value = dialog;
                isLoading.value = false;
                selectedBrand.value = {} as Brand;
            });
    }

    return {
        brands,
        fetchBrands,
        showAddBrandDialog,
        onSavedBrand,
        saveBrand,
        hideDialog,
        hideEditDialog,
        onDeletedBrand,
        onEditedBrand,
        showEditBrandDialog,
        selectedBrand,
        onUpdateBrand,
        isLoading,
    }
}