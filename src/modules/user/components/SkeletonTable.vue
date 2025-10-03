<template>
    <DataTable :value="new Array(rows)" :tableStyle="styles">
        <Column v-for="value in headers" :header="value">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
defineProps<{
    headers: Array<string>;
    rows?: number;
    styles?: string;
}>();
</script>