<template>
    <FloatLabel variant="on">
        <AutoComplete v-model="form.ordenEntrada" id="entradaOrden" :suggestions="items" @complete="search"
            size="small" />
        <label for="entradaOrden">Orden entrada</label>
    </FloatLabel>

    <FloatLabel variant="on" class="my-4">
        <AutoComplete v-model="form.ordenEntrada" inputId="on_label" :suggestions="items" @complete="search"
            size="small" />
        <label for="on_label">Orden entrada</label>
    </FloatLabel>
    <FloatLabel class="w-full md:w-56 my-4" variant="on">
        <Select v-model="form.tipo" inputId="on_label" :options="tipo" optionLabel="name" class="w-full" size="small" />
        <label for="on_label">Tipo</label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <DatePicker v-model="form.fechaEntrada" inputId="on_label" showIcon iconDisplay="input" dateFormat="dd/mm/yy"
            size="small" />
        <label for="on_label">Fecha de entrada</label>
    </FloatLabel>
    <FloatLabel class="w-full md:w-56 my-4" variant="on">
        <Select v-model="form.estado" inputId="on_label" :options="estado" optionLabel="name" class="w-full"
            size="small" />
        <label for="on_label">Estado</label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <InputText id="" size="small" placeholder="Nombre autoriza" />
        <label for="">Autorización</label>
    </FloatLabel>
</template>