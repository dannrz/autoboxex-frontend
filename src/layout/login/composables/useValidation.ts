import z from "zod";

export const useValidation = () => {
    const loginSchema = z.object({
        username: z.string().nonempty('El usuario es requerido'),
        password: z.string()
            .nonempty('La contraseña es requerida')
            // .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .pipe(z.string().regex(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, 'La contraseña solo puede contener letras, números y caracteres especiales'))
            .refine((val) => !val.includes(' '), {
                message: 'La contraseña no debe contener espacios en blanco',
            })
    });

    const restoreSchema = z.object({
        username: z.string().min(1, 'El usuario es requerido'),
        newPassword: z.string()
            .nonempty('La contraseña es requerida')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .pipe(z.string().regex(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, 'La contraseña solo puede contener letras, números y caracteres especiales'))
            .refine((val) => !val.includes(' '), {
                message: 'La contraseña no debe contener espacios en blanco',
            }),
        confirmPassword: z.string()
            .nonempty('La confirmación de la contraseña es requerida')
    })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: 'Las contraseñas no coinciden',
        })


    return {
        loginSchema,
        restoreSchema
    }
}