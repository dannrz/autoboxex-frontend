<template>
    <div class="w-120 login">
        <Divider layout="horizontal" align="center" type="dashed">
            <b class="text-gray-400">O bien</b>
        </Divider>
    </div>
    <div class="w-120 login">
        <Button severity="info" label="Iniciar sesión" icon="pi pi-sign-in" class="w-full"
            @click="$router.push({ name: 'login' })" text raised rounded />
    </div>
</template>