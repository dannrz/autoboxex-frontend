<template>
    <div :class="$props.class">
        <FloatLabel variant="on">
            <InputText v-if="type === 'string'" v-model="model as string" :id="refaccionType" :name="refaccionType"
                class="w-full" size="small" />
            <InputNumber v-else v-model="model as number" :id="refaccionType" :name="refaccionType" class="w-full"
                size="small" />
            <label :for="refaccionType">{{ refaccionType }}</label>
        </FloatLabel>
        <Message v-if="form[refaccionType]?.invalid" severity="error" size="small" variant="simple">
            {{ form[refaccionType].error.message }}
        </Message>
    </div>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import type { FormFieldState } from '@primevue/forms';

defineProps<{
    form: {
        register: (field: string, options: any) => any;
        reset: () => void;
        valid: boolean;
    } & {
        [key: string]: FormFieldState;
    },
    class: string,
    refaccionType: string,
    type: 'string' | 'number',
}>();

const model = defineModel<string | number>();
</script>