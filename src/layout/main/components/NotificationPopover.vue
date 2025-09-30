<template>
    <ul>
        <li v-if="requests.length > 0" v-for="value in requests"
            class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border">
            <NotificationItem :request="value" />
        </li>
        <li v-else class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border text-surface-500 dark:text-surface-400">
            No hay notificaciones pendientes.
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { PasswordRequest } from '@/modules/user/interfaces';
import { NotificationItem } from '.';

defineProps<{
    requests: Array<PasswordRequest>;
}>();
</script>