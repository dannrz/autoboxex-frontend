import { ref } from "vue";

import { AxiosError, type AxiosResponse } from "axios";
import { useToast } from "primevue/usetoast";
import Swal, { type SweetAlertResult } from 'sweetalert2';
import { ZodError } from "zod";

import api from "@/api";
import { loginService } from "../services/login";
import { UserService } from "@/modules/user/services/UserService";
import router from "@/router";
import type { ErrorResponse, LoginUser, PasswordRestoreRequest, ValidateLoginForm } from "../interfaces";
import type { PasswordInterface } from "@/modules/user/interfaces";
import { useValidation } from ".";

export const useLogin = () => {
    const toast = useToast();
    const { loginSchema, restoreSchema } = useValidation();

    const loginForm = ref<LoginUser>({
        username: '',
        password: ''
    });

    const validateLoginForm = ref<ValidateLoginForm[]>([])
    const isLoading = ref<boolean>(false);
    const load = ref<boolean>(false);

    const onLogin = async (): Promise<void> => {
        validateLoginForm.value = [];
        loginSchema.parseAsync(loginForm.value)
            .then(data => {
                isLoading.value = true;

                return loginService.login(data)
            })
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
            .catch((error: ZodError) => {
                error.issues.forEach(issue => {
                    isLoading.value = false;

                    validateLoginForm.value.push({
                        messageError: issue.message,
                        path: issue.path.join('.')
                    })
                })
            })
            .catch(({ response }: AxiosError<ErrorResponse>) => {
                isLoading.value = false;

                validateLoginForm.value.push({
                    messageError: response?.data.message || 'Error al iniciar sesión',
                    path: response?.data.mismatch!
                });

                console.warn(response?.data.message);

                toast.add({ severity: 'error', summary: 'Error de inicio de sesión', detail: response?.data.message!, life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .finally(() => {
                setTimeout((): void => {
                    validateLoginForm.value = []
                }, 4000);
            });
    }

    const clearLocalStorage = (): void => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("user");
    }

    const onLogout = async (): Promise<void> => {
        const closeEverything = () => {
            clearLocalStorage();

            router.push({ name: "login" });
        }
        loginService.logout()
            .finally(() => closeEverything());
    }

    const onExpiredSession = (): void => {
        clearLocalStorage();
        toast.add({ severity: 'warn', summary: 'La sesión ha expirado', detail: 'Por favor, inicie sesión nuevamente', life: import.meta.env.VITE_TOAST_LIFETIME });
        router.push({ name: "login" });
    }

    const onCloseSession = (): void => {
        const expiresAt = localStorage.getItem("expires_at");

        const now = new Date();
        const expiresAtDate = expiresAt ? new Date(expiresAt) : ''

        if (expiresAtDate <= now) {
            onExpiredSession();
            return;
        }

        onLogout();
    }

    const closeSession = (): void => {
        load.value = true;
        onLogout();
    }

    const onRestorePassword = async (restoreData: PasswordRestoreRequest): Promise<void> => {
        await restoreSchema.parseAsync(restoreData)
            .then(data => {
                isLoading.value = true;
                return loginService.restorePassword(data)

            })
            .then(() => {
                return Swal.fire({
                    title: 'Éxito',
                    text: 'Se realizó la solicitud de cambio de contraseña, por favor contacte al administrador para que la apruebe.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                })
            })
            .then((accepted: SweetAlertResult) => {
                if (accepted.isConfirmed) {
                    router.push({ name: 'login' });
                }
            })
            .catch(({ response }: AxiosError<ErrorResponse>) => {
                isLoading.value = false;
                toast.add({ severity: 'error', summary: 'Error', detail: response?.data.message || 'Error al cambiar la contraseña', life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .catch((error: ZodError) => {
                error.issues.forEach(issue => {
                    toast.add({ severity: 'error', summary: 'Error en el formulario', detail: issue.message, life: import.meta.env.VITE_TOAST_LIFETIME });
                    isLoading.value = false;
                });
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    const onChangePassword = (pwd: PasswordInterface): Promise<void> => {
        return UserService.changePassword(pwd)
            .then(({ data }: AxiosResponse) => {
                toast.add({ severity: 'success', summary: 'Cambio realizado correctamente', detail: data.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .then(() => onLogout())
            .catch(({ response }: AxiosError<{ message: string }>) => {
                toast.add({ severity: 'error', summary: 'Error', detail: response?.data.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            });
    }

    return {
        loginForm,
        validateLoginForm,
        isLoading,
        onLogin,
        onLogout,
        onExpiredSession,
        onCloseSession,
        closeSession,
        load,
        onRestorePassword,
        onChangePassword
    }
}