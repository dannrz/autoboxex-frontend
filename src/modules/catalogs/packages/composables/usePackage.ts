import { ref } from "vue"
import { PackageService } from "../services/PackageService";
import type { Package } from "../interfaces";

export const usePackage = () => {
    const packages = ref<Array<Package>>([]);
    const isLoadingPackages = ref<boolean>(false);

    const initData = (): void => {
        getPackages();
    }

    const getPackages = async (): Promise<void> => {
        isLoadingPackages.value = true;

        PackageService.getPackages()
            .then(({ data }): void => {
                packages.value = data;
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