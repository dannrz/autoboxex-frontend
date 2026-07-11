<template>
    <div class="grid grid-cols-1 gap-20">
        <Menu :items="items" :avatar-label="avatarLabel" :user="user" />
        <section class="w-[97%]" style="margin: 0 auto;">
            <RouterView />
        </section>
    </div>
</template>

<script setup lang="ts">
import { Menu } from '../components';
import { useMenu, useUser } from '../composables';

const { items } = useMenu();
const { avatarLabel, user } = useUser()
</script>

<style src="../styles/main.css" />