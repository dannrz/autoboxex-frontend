import { ref, type Ref } from "vue"
import type { Brand } from "../interfaces/Brand.interface";
import { BrandService } from "../services/BrandService";

export const useBrands = () => {
    const brands: Ref<Brand[]> = ref([]);

    const fetchBrands = () => {
        BrandService.getBrands()
            .then(({ data }) => {
                brands.value = data;

                console.warn(data)
            })
    }
    return {
        brands,
        fetchBrands
    }
}