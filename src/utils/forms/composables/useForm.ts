import type { PasswordInterface } from "@/modules/user/interfaces";
import Swal, { type SweetAlertIcon } from "sweetalert2";
import { ref } from "vue"
import z from "zod";

export const useForm = () => {
    const items = ref<string[]>([]);

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

    return {
        items,
        search,
        comparePasswords,
    }
}