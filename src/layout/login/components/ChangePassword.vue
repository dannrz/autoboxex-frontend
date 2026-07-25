<template>
    <div class="w-120 login">
        <Divider layout="horizontal" align="center" type="dashed">
            <b class="text-gray-400">O si olvidaste tu contraseña</b>
        </Divider>
    </div>
    <div class="w-120 login">
        <Button severity="info" label="Cambiar contraseña" icon="pi pi-sync" class="w-full"
            @click="$router.push({ name: 'change-password' })" text raised rounded />
    </div>
</template>