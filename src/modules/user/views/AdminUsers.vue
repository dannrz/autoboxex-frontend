<template>
    <DataTable :value="new Array(3)" v-if="allUsers.length === 0">
        <Column header="#" style="width: 2rem;">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column header="Nombre">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column header="Username">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column header="Rol">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
        <Column header="Acciones">
            <template #body>
                <Skeleton></Skeleton>
            </template>
        </Column>
    </DataTable>

    <DataTable v-else :value="allUsers" stripedRows tableStyle="min-width: 50rem">
        <Column field="id" header="#" style="width: 2rem;"></Column>
        <Column field="name" header="Nombre"></Column>
        <Column field="username" header="Username"></Column>
        <Column field="role.description" header="Rol"></Column>
        <Column header="Acciones">
            <template #body="{ data }">
                <div class="flex gap-4">
                    <Button icon="pi pi-user-edit" v-tooltip.top="{
                        value: `Editar información de ${data.name}`,
                    }" outlined rounded />
                    <Button icon="pi pi-power-off" v-tooltip.bottom="{
                        value: `Desactivar cuenta de ${data.name}`,
                    }" outlined rounded />
                </div>
            </template>
        </Column>
        <template #empty>Sin usuarios registrados</template>
    </DataTable>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { UserService } from '../services/UserService';
import type { User } from '@/layout/login/interfaces';

const allUsers: Ref<User[]> = ref([])

UserService.users()
    .then(({ data }) => {
        data.map((user, i) => {
            user.id = i + 1;
        })

        allUsers.value = data
    })
</script>