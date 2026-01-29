<template>
    <h1 class="text-emerald-700 text-2xl text-center pb-1.5">
        Refacciones
    </h1>

    <RefacsTable :refacciones :filters />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RefacsTable } from '../components';
import { useRefac } from '../composables/useRefac';
import { useService } from '@/modules/processes/service/composables/useService';

const { loadRefacciones, refacciones } = useRefac();
const { filters } = useService()

onMounted(() => {
    loadRefacciones();
})
</script>