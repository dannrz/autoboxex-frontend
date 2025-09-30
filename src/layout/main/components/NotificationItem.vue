<template>
        <RouterLink to="/password-requests">
            <span class="font-medium">{{ request.user.username }} solicitó un cambio de contraseña</span>
            <div class="text-sm text-surface-500 dark:text-surface-400">{{ request.requested_at_formatted }}</div>
        </RouterLink>
</template>

<script setup lang="ts">
import type { PasswordRequest } from '@/modules/user/interfaces';

defineProps<{
    request: PasswordRequest;
}>();

</script>