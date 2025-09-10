import { ref } from "vue";
import Swal, { type SweetAlertResult } from "sweetalert2";
import { useConfirm } from "primevue/useconfirm";
import { UserService } from "../services/UserService";
import type { PasswordRequest } from "../interfaces";
import { useToast } from "primevue/usetoast";

export const usePassword = () => {
    const allUsers = ref<Array<PasswordRequest>>([]);
    const skeletonTable = ref<boolean>(true);

    const confirm = useConfirm();
    const toast = useToast();

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
        UserService.passwordRequests().then(({ data }) => {
            allUsers.value = data;
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
        allUsers,
        onResponsePasswordRequest,
        loadRequests,
        skeletonTable,
        confirmRequest,
        rejectRequest
    };
}