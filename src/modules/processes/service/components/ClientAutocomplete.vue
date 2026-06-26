<template>
    <div class="relative w-full" ref="wrapper">
        <FloatLabel variant="on" class="w-full">
            <InputText
                id="cliente-autocomplete"
                v-model="query"
                class="w-full"
                size="small"
                autocomplete="off"
                @focus="onFocus"
                @input="onInput"
            />
            <label for="cliente-autocomplete">Cliente</label>
        </FloatLabel>

        <ul
            v-if="isOpen && filtered.length > 0"
            class="absolute z-50 w-full mt-1 max-h-56 overflow-y-auto rounded-md border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 shadow-md text-sm"
        >
            <li
                v-for="client in filtered"
                :key="client.IdCliente"
                class="px-3 py-2 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-800 flex justify-between items-center gap-2"
                @mousedown.prevent="select(client)"
            >
                <span class="font-medium truncate">{{ client.Nombre }}</span>
                <span class="text-surface-400 text-xs shrink-0">{{ client.IdCliente }}</span>
            </li>
        </ul>

        <p
            v-else-if="isOpen && query.length >= 1 && filtered.length === 0"
            class="absolute z-50 w-full mt-1 px-3 py-2 rounded-md border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 shadow-md text-sm text-surface-400"
        >
            Sin resultados para "{{ query }}"
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Clientes } from '../interfaces';

const props = defineProps<{
    clientes: Clientes[];
    modelValue: Clientes | null;
}>();

const emits = defineEmits<{
    'update:modelValue': [value: Clientes];
    'select': [value: Clientes];
}>();

const query = ref('');
const isOpen = ref(false);
const wrapper = ref<HTMLElement | null>(null);

const filtered = computed(() => {
    if (!query.value) return props.clientes.slice(0, 30);
    const q = query.value.toLowerCase();
    return props.clientes
        .filter(c => c.Nombre.toLowerCase().includes(q))
        .slice(0, 30);
});

const onFocus = () => { isOpen.value = true; };

const onInput = () => { isOpen.value = true; };

const select = (client: Clientes) => {
    query.value = client.Nombre;
    isOpen.value = false;
    emits('update:modelValue', client);
    emits('select', client);
};

const onClickOutside = (e: MouseEvent) => {
    if (wrapper.value && !wrapper.value.contains(e.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(() => document.addEventListener('mousedown', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside));
</script>
