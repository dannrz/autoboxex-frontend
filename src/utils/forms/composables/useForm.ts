import type { FormRegister, ServiceType } from "@/modules/register/interfaces";
import { RegisterService } from "@/modules/register/services/registerService";
import type { PasswordInterface } from "@/modules/user/interfaces";
import { useFormStore } from "@/stores/useFormStore";
import { useToast } from "primevue";
import { ref } from "vue"
import z from "zod";

export const useForm = () => {
    const toast = useToast();
    const formStore = useFormStore();

    const items = ref<string[]>([]);
    const form = ref<FormRegister>({} as FormRegister);
    const lists = ref<Array<ServiceType[]>>([]);
    const isLoadingTipos = ref<boolean>(false);
    const isLoadingStates = ref<boolean>(false);

    const passwordSchema = z.object(
        {
            password: z.string()
                .nonempty('La contraseña es requerida')
                .min(6, 'La contraseña debe tener al menos 6 caracteres')
                .pipe(z.string().regex(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, 'La contraseña solo puede contener letras, números y caracteres especiales'))
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

    const onClear = (): void => {
        form.value = {} as FormRegister;
        toast.add({ severity: 'info', summary: '¡Listo!', detail: 'Formulario limpiado', life: import.meta.env.VITE_TOAST_LIFETIME });
    }

    const onSubmit = (): void => {
        console.log(form.value);
    }

    const fetchLists = (): void => {
        if (formStore.$state.tipoServicios.length > 0) {
            lists.value[0] = formStore.$state.tipoServicios;
            return;
        }
        isLoadingTipos.value = true;
        RegisterService.serviceType()
            .then(({ data }): void => {
                formStore.$state.tipoServicios = data;
                lists.value[0] = data;
            })
            .finally(() => {
                isLoadingTipos.value = false;
            });

        if (formStore.$state.state.length > 0) {
            lists.value[1] = formStore.$state.state;
            return;
        }
        isLoadingStates.value = true;
        RegisterService.states()
            .then(({ data }): void => {
                formStore.$state.state = data;
                lists.value[1] = data;
            })
            .finally(() => {
                isLoadingStates.value = false;
            });
    }

    return {
        items,
        form,
        search,
        comparePasswords,
        onSubmit,
        onClear,
        fetchLists,
        lists,
        isLoadingTipos,
        isLoadingStates,
    }
}