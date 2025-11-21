import { ref, type Ref } from "vue"
import type { Brand } from "../interfaces/Brand.interface";
import { BrandService } from "../services/BrandService";

export const useBrands = () => {
    const brands: Ref<Brand[]> = ref([]);
    const showAddBrandDialog = ref(false);

    const fetchBrands = () => {
        BrandService.getBrands()
            .then(({ data }): void => {
                brands.value = data;
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