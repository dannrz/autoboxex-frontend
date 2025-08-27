<template>
    <div class="grid grid-cols-1 gap-20">
        <Menu />
        <section class="w-[97%]" style="margin: 0 auto;">
            <RouterView />
        </section>
    </div>
</template>

<script setup lang="ts">
import Menu from '@/layout/main/components/Menu.vue';
</script>
