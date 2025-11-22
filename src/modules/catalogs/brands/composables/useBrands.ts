import { ref, type Ref } from "vue"
import type { Brand } from "../interfaces/Brand.interface";
import { BrandService } from "../services/BrandService";
import { useCatalogStore } from "@/stores/useCatalogStore";

export const useBrands = () => {
    const brands: Ref<Brand[]> = ref([]);
    const showAddBrandDialog = ref(false);
    const catalogStore = useCatalogStore();

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

    return {
        brands,
        fetchBrands,
        showAddBrandDialog,
        onSavedBrand,
    }
}