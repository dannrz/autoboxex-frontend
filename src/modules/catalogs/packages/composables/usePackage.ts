import { ref } from "vue"
import { PackageService } from "../services/PackageService";
import type { Package } from "../interfaces";
import { useCatalogStore } from "@/stores";

export const usePackage = () => {
    const packages = ref<Array<Package>>([]);
    const isLoadingPackages = ref<boolean>(false);

    const store = useCatalogStore();

    const initData = (): void => {
        getPackages();
    }

    const getPackages = async (): Promise<void> => {
        isLoadingPackages.value = true;

        if (store.packages.length > 0) {
            packages.value = store.packages;
            isLoadingPackages.value = false;
            return;
        }

        PackageService.getPackages()
            .then(({ data }): void => {
                packages.value = data;
                store.$state.packages = data;
            })
            .catch((error): void => {
                console.error("Error fetching packages:", error);
            })
            .finally((): void => {
                isLoadingPackages.value = false;
            });
    }

    return {
        initData,
        packages,
        isLoadingPackages,
    }
}