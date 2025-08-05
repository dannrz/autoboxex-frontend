import { AxiosError } from "axios";
import { ref, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import z, { ZodError } from "zod";
import { api } from "@/api/baseApi";
import { loginService } from "../services/login";
import router from "@/router";
import type { ErrorResponse, LoginUser, ValidateLoginForm } from "../interfaces";

export const useLogin = () => {
    const loginVars: Ref<LoginUser> = ref<LoginUser>({
        username: '',
        password: ''
    });

    const validateLoginForm: Ref<ValidateLoginForm[]> = ref<Array<ValidateLoginForm>>([])
    const isLoading = ref<boolean>(false);
    const toast = useToast();

    const loginSchema = z.object({
        username: z.string().min(1, 'El usuario es requerido'),
        password: z.string()
            .nonempty('La contraseña es requerida')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .pipe(z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'))
            .refine((val) => !val.includes(' '), {
                message: 'La contraseña no debe contener espacios en blanco',
            })
    });

    const onLogin = async (): Promise<void> => {
        loginSchema.parseAsync(loginVars.value)
            .then(async (data: LoginUser): Promise<void> => {
                isLoading.value = true;

                loginService.login(data)
                    .then(({ data }) => {
                        const { access_token, user, expires_at } = data;

                        localStorage.setItem("access_token", access_token)
                        localStorage.setItem("expires_at", expires_at.toString())
                        localStorage.setItem("user", JSON.stringify(user))

                        api.interceptors.request.use(config => {
                            if (access_token) {
                                config.headers.Authorization = `Bearer ${access_token}`
                            }
                            return config
                        })

                        router.push({ name: 'home' });
                    })
                    .catch(({ response }: AxiosError<ErrorResponse>) => {
                        isLoading.value = false;

                        validateLoginForm.value.push({
                            showMessageError: true,
                            messageError: response?.data.message || 'Error al iniciar sesión',
                            path: response?.data.mismatch!
                        });

                        toast.add({ severity: 'error', summary: 'Error de inicio de sesión', detail: response?.data.message!, life: import.meta.env.VITE_TOAST_LIFETIME });

                        setTimeout((): void => {
                            validateLoginForm.value = []
                        }, 3500)
                    })
            })
            .catch((error: ZodError) => {
                error.issues.forEach(issue => {
                    isLoading.value = false;

                    validateLoginForm.value.push({
                        showMessageError: true,
                        messageError: issue.message,
                        path: issue.path.join('.')
                    })
                })

                setTimeout((): void => {
                    validateLoginForm.value = []
                }, 3500)
            });
    }

    const onLogout = async (): Promise<void> => {
        const closeEverything = () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("expires_at");

            router.push({ name: "login" });
        }
        loginService.logout()
            .then(() => {
                closeEverything();
            })
            .catch(() => {
                closeEverything();
            });
    }

    const onExpiredSession = (): void => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
        toast.add({ severity: 'warn', summary: 'La sesión ha expirado', detail: 'Por favor, inicie sesión nuevamente', life: import.meta.env.VITE_TOAST_LIFETIME });

        router.push({ name: "login" });
    }

    const onCloseSession = (): void => {
        const expiresAt = localStorage.getItem("expires_at");

        const now = new Date();
        const expiresAtDate = expiresAt ? new Date(expiresAt) : ''

        if (expiresAtDate <= now) {
            onExpiredSession();
        } else {
            onLogout();
        }

    }

    return {
        loginVars,
        validateLoginForm,
        isLoading,
        onLogin,
        onLogout,
        onExpiredSession,
        onCloseSession
    }
}