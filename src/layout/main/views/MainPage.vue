<template>
    <Menu />
    <div class="mt-7">
        {{ services }}
        {{ token }}
    </div>
    <div class="flex w-full h-full mt-7">
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
