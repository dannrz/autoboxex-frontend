<template>
    <FloatLabel variant="on">
        <Textarea id="over_label" v-model="form.observaciones" rows="3" cols="52" style="resize: " class="my-2"
            size="small" />
        <label for="on_label">Observaciones:</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <Textarea id="over_label" v-model="form.ingresaPor" rows="3" cols="55" style="resize:" class="my-2"
            size="small" />
        <label for="on_label">Ingresa por: </label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <InputText id="" size="small" />
        <label for="">Próximo servicio (días)</label>
    </FloatLabel>
    <FloatLabel variant="on">
        <DatePicker v-model="form.fechaSalida" inputId="on_label" showIcon iconDisplay="input" dateFormat="dd/mm/yy"
            class="my-4" size="small" />
        <label for="on_label">Fecha de salida</label>
    </FloatLabel>
    <FloatLabel variant="on" class="my-4">
        <InputText id="" size="small" />
        <label for="on_label"></label>
    </FloatLabel>
</template>
