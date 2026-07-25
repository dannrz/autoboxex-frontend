<template>
    <div class="flex flex-col justify-content-center place-content-center">
        <Card id="card" class="w-120">
            <template #header>
                <img alt="Autoboxex" class="w-full" :src="logo" />
            </template>
            <template #title>Autoboxex</template>
            <template #subtitle>Admin system</template>
            <template #content>
                <LoginForm @enter="onLogin" :login="loginForm" :errors="v" />
            </template>
            <template #footer>
                <LoginFooter :isLoading="isLoading" @login="onLogin" />
            </template>
        </Card>
        <ChangePassword />
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import { useLogin } from '../composables';
import { LoginForm, ChangePassword, LoginFooter } from "../components";
import logo from "@/assets/autoboxex.jpg";

const { loginForm, validateLoginForm: v, onLogin, isLoading } = useLogin();
</script>

<style src="../styles/login.sass" lang="sass" />