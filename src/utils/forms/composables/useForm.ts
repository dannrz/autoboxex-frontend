import { api } from "@/api/baseApi"
import type { ServiceType } from "@/modules/register/interfaces"
import { ref, type Ref } from "vue"

export const useForm = () => {
    const items = ref<string[]>([]);
    const serviceType = ref<ServiceType[]>([]);
    const states = ref<ServiceType[]>([]);

    const search = (event: { query: string }) => {
        items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    const serviceTypeFn = (): Ref<ServiceType[]> => {
        api.get<ServiceType[]>('/services')
            .then(response => {
                serviceType.value = response.data;
            })
            .catch(error => {
                console.error('Error fetching services:', error);
            });

        return serviceType
    }

    const statesFn = (): Ref<ServiceType[]> => {
        api.get<ServiceType[]>('/services/states')
            .then(response => {
                states.value = response.data;
            })
            .catch(error => {
                console.error('Error fetching states:', error);
            });

        return states
    }

    statesFn();
    serviceTypeFn();

    return {
        items,
        search,
        states,
        serviceType,
    }
}