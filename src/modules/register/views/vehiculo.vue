<template>
    <FloatLabel variant="on">
        <AutoComplete v-model="form.placas" id="placas" :suggestions="items" @complete="search" size="small" />
        <label for="placas">Placas</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <AutoComplete v-model="form.marca" id="marca" :suggestions="items" @complete="search" size="small" />
        <label for="marca">Marca</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <AutoComplete v-model="form.modelo" id="modelo" :suggestions="items" @complete="search" size="small" />
        <label for="modelo">Modelo</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <InputText id="year" size="small" />
        <label for="year">Año</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <AutoComplete v-model="form.color" id="color" :suggestions="items" @complete="search" size="small" />
        <label for="color">Color</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <InputText id="serie" size="small" />
        <label for="serie">Serie</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <InputText id="kilometraje" size="small" />
        <label for="kilometraje">Kilometraje</label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <InputText id="" size="small" />
        <label for="">Año</label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <AutoComplete v-model="form.color" inputId="on_label" :suggestions="items" @complete="search" size="small" />
        <label for="">Color</label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <InputText id="" size="small" />
        <label for="">Serie</label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <InputText id="" size="small" />
        <label for="">Kilometraje</label>
    </FloatLabel>
</template>