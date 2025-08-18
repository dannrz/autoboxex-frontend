<template>
    <ToggleSwitch v-model="checked" @change="mode">
        <template #handle="{ checked }">
            <i :class="['pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
        </template>
    </ToggleSwitch>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';
import { onMounted, ref, type Ref } from 'vue';

const savedMode = localStorage.getItem('autoboxex-dark');
const checked: Ref<boolean> = ref<boolean>(savedMode === 'true' ? true : false);

onMounted((): void => {
    if (checked.value) {
        document.documentElement.classList.add('autoboxex-dark');
    } else {
        document.documentElement.classList.remove('autoboxex-dark');
    }
});

const mode = (): void => {
    document.documentElement.classList.toggle('autoboxex-dark');
    localStorage.setItem('autoboxex-dark', String(checked.value));
}
</script>