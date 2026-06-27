<template>
    <div class="flex flex-col gap-6">

        <!-- Descarga rápida por folio -->
        <Card>
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-download text-cyan-500" />
                    <span>Descargar Orden de Servicio</span>
                </div>
            </template>
            <template #content>
                <div class="flex flex-wrap items-end gap-4 my-2">
                    <FloatLabel variant="on">
                        <InputText v-model="folioDescarga" id="folioDescarga" size="small" type="number"
                            style="width:160px" @keyup.enter="pdfFolioDirecto" />
                        <label for="folioDescarga">Folio OE</label>
                    </FloatLabel>
                    <Button label="Descargar Excel" icon="pi pi-file-excel" size="small" severity="success"
                        :loading="exporting" :disabled="!folioDescarga" @click="excelFolioDirecto" />
                    <Button label="Descargar PDF" icon="pi pi-file-pdf" size="small" severity="danger"
                        :loading="exporting" :disabled="!folioDescarga" @click="pdfFolioDirecto" />
                    <Divider layout="vertical" />
                    <Button label="Excel — todos los registros" icon="pi pi-file-excel" size="small"
                        severity="success" outlined :loading="exporting" @click="exportExcelAll" />
                </div>
            </template>
        </Card>

        <!-- Búsqueda -->
        <Card>
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-search text-cyan-500" />
                    <span>Buscar Servicios</span>
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-12 gap-4 my-4 items-center">
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText v-model="filters.folio" id="folio" class="w-full" size="small" type="number" />
                        <label for="folio">Folio OE</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-3">
                        <InputText v-model="filters.placas" id="placas" class="w-full" size="small" />
                        <label for="placas">Placas</label>
                    </FloatLabel>
                    <FloatLabel variant="on" class="col-span-4">
                        <AutoComplete
                            v-model="clienteQuery"
                            id="cliente"
                            :suggestions="clienteSuggestions"
                            optionLabel="Nombre"
                            :forceSelection="false"
                            class="w-full"
                            :inputStyle="{ width: '100%' }"
                            size="small"
                            @complete="searchCliente"
                            @option-select="onClienteSelect"
                        />
                        <label for="cliente">Cliente</label>
                    </FloatLabel>
                    <div class="col-span-2 flex gap-2">
                        <Button label="Buscar" icon="pi pi-search" size="small" severity="contrast"
                            :loading="loading" @click="buscar" class="flex-1" />
                        <Button icon="pi pi-undo" size="small" severity="secondary"
                            @click="limpiar" v-tooltip="'Limpiar'" />
                    </div>
                </div>
            </template>
        </Card>

        <!-- Resultados -->
        <Card v-if="resultados.length">
            <template #content>
                <DataTable
                    :value="resultados"
                    paginator
                    :rows="10"
                    :rowsPerPageOptions="[10, 25, 50]"
                    stripedRows
                    size="small"
                    dataKey="IdMovimiento"
                    :globalFilterFields="['FolioOE','cliente.Nombre','vehiculo.Placas','vehiculo.Modelo','Estado']"
                    v-model:filters="tableFilters"
                >
                    <template #header>
                        <div class="flex justify-end">
                            <IconField>
                                <InputIcon><i class="pi pi-search" /></InputIcon>
                                <InputText v-model="tableFilters['global'].value"
                                    placeholder="Filtrar tabla..." size="small" />
                            </IconField>
                        </div>
                    </template>

                    <Column field="FolioOE" header="Folio OE" sortable style="width:90px" />
                    <Column field="cliente.Nombre" header="Cliente" sortable />
                    <Column field="vehiculo.Placas" header="Placas" sortable style="width:110px" />
                    <Column header="Vehículo">
                        <template #body="{ data }">
                            {{ [data.vehiculo?.marca?.Marca?.trim(), data.vehiculo?.Modelo, data.vehiculo?.Año]
                                .filter(Boolean).join(' ') || '—' }}
                        </template>
                    </Column>
                    <Column field="Estado" header="Estado" style="width:110px">
                        <template #body="{ data }">
                            <Tag :value="data.Estado ?? 'Sin estado'" severity="info" />
                        </template>
                    </Column>
                    <Column header="F. Entrada" style="width:100px">
                        <template #body="{ data }">{{ formatFecha(data.FEntrada) }}</template>
                    </Column>
                    <Column header="Descargar" style="width:110px">
                        <template #body="{ data }">
                            <div class="flex gap-1">
                                <Button icon="pi pi-file-excel" size="small" severity="success" text
                                    v-tooltip="'Excel'" :loading="exporting"
                                    @click="exportExcelFolio(data)" />
                                <Button icon="pi pi-file-pdf" size="small" severity="danger" text
                                    v-tooltip="'PDF'" :loading="exporting"
                                    @click="exportPdf(data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { api } from '@/api/baseApi';
import { ExportService } from '../services/exportService';
import type { ServicioConsulta } from '../interfaces/Consultas.interface';
import type { Clientes } from '@/modules/processes/service/interfaces';
import { RegisterService } from '@/modules/processes/service/services/registerService';
import { useToast } from 'primevue';

const toast   = useToast();
const loading  = ref(false);
const exporting = ref(false);

// Descarga directa por folio
const folioDescarga = ref('');

// Búsqueda
const filters        = ref({ folio: '', placas: '', idCliente: null as number | null });
const clienteQuery   = ref('');
const clienteSuggestions = ref<Clientes[]>([]);
const todosClientes  = ref<Clientes[]>([]);
const resultados     = ref<ServicioConsulta[]>([]);
const tableFilters   = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });

RegisterService.getClients().then(({ data }) => { todosClientes.value = data; });

const searchCliente = (event: { query: string }) => {
    const q = event.query.toLowerCase();
    clienteSuggestions.value = todosClientes.value
        .filter(c => c.Nombre.toLowerCase().includes(q))
        .slice(0, 30);
};

const onClienteSelect = (event: { value: Clientes }) => {
    filters.value.idCliente = event.value.IdCliente;
};

const buscar = async () => {
    loading.value = true;
    try {
        const params: Record<string, any> = {};
        if (filters.value.folio)     params.folio     = filters.value.folio;
        if (filters.value.placas)    params.placas    = filters.value.placas;
        if (filters.value.idCliente) params.idCliente = filters.value.idCliente;

        const { data } = await api.get('/services/search', { params });
        resultados.value = data;

        if (!data.length) {
            toast.add({ severity: 'info', summary: 'Sin resultados',
                detail: 'No se encontraron servicios con esos filtros.', life: 3000 });
        }
    } catch {
        toast.add({ severity: 'error', summary: 'Error',
            detail: 'No se pudo realizar la búsqueda.', life: 4000 });
    } finally {
        loading.value = false;
    }
};

const limpiar = () => {
    filters.value    = { folio: '', placas: '', idCliente: null };
    clienteQuery.value = '';
    resultados.value   = [];
};

const formatFecha = (fecha: string | null) =>
    fecha ? new Date(fecha).toLocaleDateString('es-MX',
        { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—';

// Exportación
const handleExport = async (fn: () => Promise<void>) => {
    exporting.value = true;
    try { await fn(); }
    catch (err: any) {
        toast.add({ severity: 'error', summary: 'Error al exportar',
            detail: err?.message ?? 'No se pudo generar el archivo.', life: 5000 });
    } finally {
        exporting.value = false;
    }
};

const excelFolioDirecto = () =>
    handleExport(() => ExportService.excelByFolio(Number(folioDescarga.value)));

const pdfFolioDirecto   = () =>
    handleExport(() => ExportService.pdfByFolio(Number(folioDescarga.value)));

const exportExcelAll    = () =>
    handleExport(() => ExportService.excelAll());

const exportExcelFolio  = (row: ServicioConsulta) =>
    handleExport(() => row.FolioOE
        ? ExportService.excelByFolio(row.FolioOE)
        : ExportService.excelByFolio(row.IdMovimiento));

const exportPdf         = (row: ServicioConsulta) =>
    handleExport(() => ExportService.pdfById(row.IdMovimiento));
</script>
