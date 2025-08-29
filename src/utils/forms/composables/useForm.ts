import { api } from "@/api/baseApi"
import type { ServiceType } from "@/modules/register/interfaces"
import type { PasswordInterface } from "@/modules/user/interfaces";
import { ref, type Ref } from "vue"
import z from "zod";

export const useForm = () => {
    const items = ref<string[]>([]);
    const serviceType = ref<ServiceType[]>([]);
    const states = ref<ServiceType[]>([]);

    const passwordSchema = z.object(
        {
            password: z.string()
                .nonempty('La contraseña es requerida')
                .min(6, 'La contraseña debe tener al menos 6 caracteres')
                .pipe(z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'))
                .refine((val) => !val.includes(' '), {
                    message: 'La contraseña no debe contener espacios en blanco',
                }),
            confirmPassword: z.string(),
            currentPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Las contraseñas no coinciden',
        });

    const comparePasswords = async (passwords: PasswordInterface): Promise<PasswordInterface> => {
        return await passwordSchema.parseAsync(passwords)
    }

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
        comparePasswords,
    }
}