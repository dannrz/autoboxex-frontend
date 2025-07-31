import { ref, type Ref } from "vue";
import z, { ZodError } from "zod";
import type { ErrorResponse, LoginUser, ValidateLoginForm } from "../interfaces";
import { loginService } from "../services/login";
import router from "@/router";
import { AxiosError } from "axios";
import { useToast } from "primevue/usetoast";
import { api } from "@/api/baseApi";

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
                        // console.log(data)
                        api.interceptors.request.use(config => {
                            const { access_token } = data
                            if (access_token) {
                                localStorage.setItem("access_token", access_token)
                                config.headers.Authorization = `Bearer ${access_token}`
                            }
                            return config
                        })
                        router.push({ name: 'home' });
                    })
                    .catch(({ response }: AxiosError<ErrorResponse>) => {
                        console.log(response)
                        isLoading.value = false;
                        validateLoginForm.value.push({
                            showMessageError: true,
                            messageError: response?.data.message || 'Error al iniciar sesión',
                            path: response?.data.mismatch!
                        });
                        toast.add({ severity: 'error', summary: 'Error de inicio de sesión', detail: response?.data.message!, life: 3000 });
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
        loginService.logout()
            .then(() => {
                localStorage.removeItem("access_token");
                router.push({ name: "login" });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return {
        loginVars,
        validateLoginForm,
        isLoading,
        onLogin,
        onLogout
    }
}