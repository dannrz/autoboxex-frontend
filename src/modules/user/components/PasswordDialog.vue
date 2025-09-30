<template>
    <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                <div
                    class="rounded-full bg-amber-400 text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                    <i class="pi pi-question !text-4xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex justify-evenly w-full p-4">
                    <Button severity="info" label="Guardar" @click="acceptCallback"></Button>
                    <Button severity="warn" label="Cancelar" variant="outlined" @click="rejectCallback" outlined />
                </div>
            </div>
        </template>
    </ConfirmDialog>
</template>