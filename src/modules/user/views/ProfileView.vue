<template>
    <div class="flex flex-col gap-11">
        <UserInfoCard :user="{ name, role, username, email }" />
        <PasswordChangeCard @changePassword="onChangePassword($event)" />
    </div>
    <PasswordDialog />
</template>

<script setup lang="ts">
import type { User } from '@/layout/login/interfaces';
import UserInfoCard from '../components/UserInfoCard.vue';
import PasswordChangeCard from '../components/PasswordChangeCard.vue';
import PasswordDialog from '../components/PasswordDialog.vue';
import { useLogin } from '@/layout/login/composables/useLogin';

const { name, role, username, email }: User = JSON.parse(localStorage.getItem('user') || '{}');

const { onChangePassword } = useLogin()
</script>