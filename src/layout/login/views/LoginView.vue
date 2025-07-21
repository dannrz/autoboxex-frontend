<template>
    <Card style="width: 25rem; overflow: hidden;" class="mx-auto my-8">
        <template #header>
            <img alt="Autoboxex" class="img-fluid w-full" src="../../../assets/autoboxex.jpg" />
        </template>
        <template #title>Autoboxex</template>
        <template #subtitle>Admin system</template>
        <template #content>
            <div class="">
                <FloatLabel variant="on" class="my-4">
                    <InputText id="username" size="large" class="w-full" />
                    <label for="username">Usuario</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="password" type="password" size="large" class="w-full" />
                    <label for="password">Contraseña</label>
                </FloatLabel>
            </div>
        </template>
        <template #footer>
            <div class="px-8 py-3">
                 <RouterLink to="home">
                     <Button label="Ingresar" icon="pi pi-user" class="w-full" outlined />
                 </RouterLink>
            </div>
        </template>
    </Card>
    <div style="width: 25rem;" class="mx-auto">
        <Divider layout="horizontal" align="center" type="dashed"><b class="text-gray-400">O bien</b></Divider>
    </div>
    <div style="width: 25rem;" class="mx-auto flex justify-content-between">
        <Button severity="info" label="Registrate" icon="pi pi-plus" class="w-full" outlined />
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import FloatLabel from 'primevue/floatlabel';
</script>

<style >
:root {
    --p-card-color: red;
    --card-border-radius: 25rem;
    --p-card-title-font-size: 1.25rem;
}
</style>