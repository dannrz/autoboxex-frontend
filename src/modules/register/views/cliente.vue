<template>
    <div>
    <FloatLabel variant="on">
        <AutoComplete v-model="form.idCliente" id="idCliente" :suggestions="items" @complete="search" size="small" />
        <label for="idCliente">Id Cliente </label>
    </FloatLabel>
    <FloatLabel variant="on">
        <InputText id="cliente" size="small" />
        <label for="cliente">Cliente</label>
    </FloatLabel>
    </div>
</template>
