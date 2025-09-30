import { ref } from "vue";
import Swal, { type SweetAlertResult } from "sweetalert2";
import { useConfirm } from "primevue/useconfirm";
import { UserService } from "../services/UserService";
import type { PasswordInterface, PasswordRequest } from "../interfaces";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "@/stores/useUserStore";
import z, { ZodError } from "zod";

export const usePassword = () => {
    const allUsers = ref<Array<PasswordRequest>>([]);
    const skeletonTable = ref<boolean>(true);
    const pwd = ref<PasswordInterface>({} as PasswordInterface);
    const isLoading = ref<boolean>(false);

    const confirm = useConfirm();
    const toast = useToast();
    const passwordStore = useUserStore();

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

    const requireConfirmation = (emit: any): void => {
        isLoading.value = true;

        comparePasswords(pwd.value)
            .then(() => {
                confirm.require({
                    group: 'headless',
                    header: '¿Está seguro de cambiar la contraseña?',
                    message: 'Sugerimos usar una contraseña fuerte y única. En caso de olvidarla solicite el cambio a su administrador.',
                    accept: () => {
                        emit('changePassword', pwd.value);
                    },
                    reject: () => {
                        toast.add({ severity: 'info', summary: 'Cambio cancelado', detail: 'No se realizó el cambio de contraseña', life: import.meta.env.VITE_TOAST_LIFETIME });
                    }
                });
            })
            .catch((error: ZodError) => {
                error.issues.forEach(issue => {
                    toast.add({ severity: 'error', summary: issue.path.join('.'), detail: issue.message, life: import.meta.env.VITE_TOAST_LIFETIME });
                });
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    const onResponsePasswordRequest = (id: number, accept: boolean): void => {
        UserService.respondPasswordRequest(id, accept)
            .then(({ data }) => {
                Swal.fire({
                    icon: data.status === 'accepted' ? 'success' : 'info',
                    title: data.status === 'accepted' ? 'Cambio aceptado' : 'Cambio rechazado',
                    text: data.message,
                }).then((accepted: SweetAlertResult): void => {
                    if (accepted.isConfirmed) {
                        allUsers.value = allUsers.value.filter((user) => user.user_id !== id);
                        passwordStore.$reset();
                    }
                });
            })
            .catch(({ response }) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message || 'Ha ocurrido un error inesperado',
                });
            });
    }

    const loadRequests = (): void => {
        if (passwordStore.$state.passwordRequests.length > 0) {
            allUsers.value = passwordStore.$state.passwordRequests;
            skeletonTable.value = false;

            return;
        }

        UserService.passwordRequests().then(({ data }) => {
            allUsers.value = data;
            passwordStore.$state.passwordRequests = data;
            skeletonTable.value = false;

            allUsers.value.map((user, index) => {
                user.user.id = index + 1;
            });
        })
    }

    const confirmRequest = (event: any, id: number) => {
        confirm.require({
            target: event.currentTarget,
            message: '¿Desea proceder con este cambio de contraseña?',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Proceder'
            },
            accept: () => {
                onResponsePasswordRequest(id, true)
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Has cancelado el cambio de contraseña', life: import.meta.env.VITE_TOAST_LIFETIME });
            }
        });
    }

    const rejectRequest = (event: any, id: number) => {
        confirm.require({
            target: event.currentTarget,
            message: '¿Está seguro de rechazar este cambio de contraseña? Esta acción no se puede deshacer.',
            icon: 'pi pi-info-circle',
            rejectProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Rechazar cambio',
                severity: 'danger'
            },
            accept: () => {
                onResponsePasswordRequest(id, false)
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Has cancelado la operación', life: import.meta.env.VITE_TOAST_LIFETIME });
            }
        });
    }

    return {
        comparePasswords,
        allUsers,
        onResponsePasswordRequest,
        loadRequests,
        skeletonTable,
        confirmRequest,
        rejectRequest,
        requireConfirmation,
        isLoading,
        pwd,
    };
}