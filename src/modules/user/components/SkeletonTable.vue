<template>
    <DataTable :value="new Array(rows)">
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
}>();
</script>