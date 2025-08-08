<template>
    <Menu />
    {{ services }}
    {{ token }}
    <div class="flex items-center justify-center w-full h-full">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { api } from '@/api/baseApi';
import Menu from '@/layout/main/components/Menu.vue';
import { ref } from 'vue';

const services = ref([]);
const token = localStorage.getItem('access_token') || 'sin token';

api.get('/services')
    .then((res) => {
        services.value = res.data;
    }).catch((err) => {
        console.error(err.headers);
    });
</script>
