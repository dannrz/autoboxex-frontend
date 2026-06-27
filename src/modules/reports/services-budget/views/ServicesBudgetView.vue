<template>
    <div class="flex flex-col gap-6">

        <!-- Filtros -->
        <Card>
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-wallet text-cyan-500" />
                    <span>Presupuesto de Servicios</span>
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-12 gap-4 my-4 items-end">
                    <FloatLabel variant="on" class="col-span-2">
                        <AutoComplete
                            v-model="folioQuery"
                            id="folio"
                            :suggestions="folioSuggestions"
                            optionLabel="FolioOE"
                            :forceSelection="false"
                            class="w-full"
                            :inputStyle="{ width: '100%' }"
                            size="small"
                            @complete="searchFolio"
                            @option-select="(e) => { filters.folio = e.value.FolioOE; folioQuery = e.value; }"
                        />
                        <label for="folio">Folio OE</label>
                    </FloatLabel>

                    <FloatLabel variant="on" class="col-span-3">
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

                    <FloatLabel variant="on" class="col-span-2">
                        <AutoComplete
                            v-model="placasQuery"
                            id="placas"
                            :suggestions="placasSuggestions"
                            optionLabel="Placas"
                            :forceSelection="false"
                            class="w-full"
                            :inputStyle="{ width: '100%' }"
                            size="small"
                            @complete="searchPlacas"
                            @option-select="(e) => { filters.placas = e.value.Placas; placasQuery = e.value; }"
                        />
                        <label for="placas">Placas</label>
                    </FloatLabel>

                    <FloatLabel variant="on" class="col-span-2">
                        <DatePicker v-model="filters.fecha" id="fecha" class="w-full" size="small"
                            dateFormat="yy-mm-dd" showIcon iconDisplay="input" />
                        <label for="fecha">Fecha entrada</label>
                    </FloatLabel>

                    <div class="col-span-3 flex gap-2">
                        <Button label="Buscar" icon="pi pi-search" size="small" severity="contrast"
                            :loading="loading" @click="buscar" class="flex-1" />
                        <Button icon="pi pi-undo" size="small" severity="secondary"
                            v-tooltip="'Limpiar'" @click="limpiar" />
                    </div>
                </div>
            </template>
        </Card>

        <!-- Resultados -->
        <Card>
            <template #content>
                <DataTable
                    :value="resultados"
                    :loading="loading"
                    paginator
                    :rows="10"
                    :rowsPerPageOptions="[10, 25, 50]"
                    stripedRows
                    size="small"
                    dataKey="IdMovimiento"
                    v-model:filters="tableFilters"
                    :globalFilterFields="['FolioOE','cliente.Nombre','vehiculo.Placas','vehiculo.Modelo','Estado']"
                >
                    <template #header>
                        <div class="flex justify-end">
                            <IconField>
                                <InputIcon><i class="pi pi-search" /></InputIcon>
                                <InputText v-model="tableFilters['global'].value"
                                    placeholder="Filtrar..." size="small" />
                            </IconField>
                        </div>
                    </template>
                    <template #empty>
                        <div class="flex flex-col items-center gap-2 py-10 text-surface-400">
                            <i class="pi pi-wallet text-4xl" />
                            <span class="text-sm">Usa los filtros para buscar presupuestos</span>
                        </div>
                    </template>

                    <Column field="FolioOE" header="Folio OE" sortable style="width:90px" />
                    <Column field="cliente.Nombre" header="Cliente" sortable />
                    <Column field="vehiculo.Placas" header="Placas" sortable style="width:110px" />
                    <Column header="Vehículo" sortable>
                        <template #body="{ data }">
                            <div class="flex flex-col leading-tight">
                                <span class="font-medium">
                                    {{ [data.vehiculo?.marca?.Marca?.trim(), data.vehiculo?.Modelo].filter(Boolean).join(' ') || '—' }}
                                </span>
                                <span class="text-xs text-surface-400">{{ data.vehiculo?.Año ?? '' }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="Estado" header="Estado" style="width:110px">
                        <template #body="{ data }">
                            <Tag :value="data.Estado ?? 'Sin estado'" severity="info" />
                        </template>
                    </Column>
                    <Column header="F. Entrada" style="width:105px">
                        <template #body="{ data }">{{ formatFecha(data.FEntrada) }}</template>
                    </Column>
                    <Column field="Kms" header="Kms" style="width:80px">
                        <template #body="{ data }">
                            {{ data.Kms ? Number(data.Kms).toLocaleString('es-MX') : '—' }}
                        </template>
                    </Column>
                    <Column header="Presupuesto" style="width:120px">
                        <template #body="{ data }">
                            <Button
                                label="PDF"
                                icon="pi pi-file-pdf"
                                size="small"
                                severity="danger"
                                :loading="exportingId === data.IdMovimiento"
                                @click="descargarPdf(data)"
                            />
                        </template>
                    </Column>
                </DataTable>
            </template>
        </Card>

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { api } from '@/api/baseApi';
import { useToast } from 'primevue';
import { RegisterService } from '@/modules/processes/service/services/registerService';
import type { Clientes } from '@/modules/processes/service/interfaces';
import type { ServicioConsulta } from '@/modules/consultas/interfaces/Consultas.interface';

const toast = useToast();
const loading     = ref(false);
const exportingId = ref<number | null>(null);

const filters = ref({ folio: '', placas: '', idCliente: null as number | null, fecha: null as Date | null });
const resultados  = ref<ServicioConsulta[]>([]);
const tableFilters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });

// --- Folio ---
const folioQuery       = ref<string | { FolioOE: string }>('');
const folioSuggestions = ref<{ FolioOE: string }[]>([]);
const todosFolios      = ref<{ FolioOE: string }[]>([]);

RegisterService.getInOrders().then(({ data }) => { todosFolios.value = data; });

const searchFolio = (e: { query: string }) => {
    const q = e.query.toLowerCase();
    folioSuggestions.value = todosFolios.value
        .filter(f => String(f.FolioOE).includes(q))
        .slice(0, 20);
};

watch(folioQuery, (val) => {
    filters.value.folio = typeof val === 'string' ? val : val?.FolioOE ?? '';
});

// --- Cliente ---
const clienteQuery       = ref('');
const clienteSuggestions = ref<Clientes[]>([]);
const todosClientes      = ref<Clientes[]>([]);

RegisterService.getClients().then(({ data }) => { todosClientes.value = data; });

const searchCliente = (e: { query: string }) => {
    const q = e.query.toLowerCase();
    clienteSuggestions.value = todosClientes.value
        .filter(c => c.Nombre.toLowerCase().includes(q))
        .slice(0, 30);
};

const onClienteSelect = (e: { value: Clientes }) => {
    filters.value.idCliente = e.value.IdCliente;
};

watch(clienteQuery, (val) => {
    if (typeof val === 'string' && !val) filters.value.idCliente = null;
});

// --- Placas ---
const placasQuery       = ref<string | { Placas: string }>('');
const placasSuggestions = ref<{ Placas: string }[]>([]);
const todasPlacas       = ref<{ Placas: string }[]>([]);

// Cargamos placas de todos los servicios via /services/plates no funciona sin idCliente,
// así que las extraemos de los folios una vez que hay resultados, o del endpoint de marcas
RegisterService.getInOrders().then(() => {
    // Las placas las cargamos desde el endpoint general de vehículos si existe,
    // de lo contrario se filtran dinámicamente de los resultados de búsqueda
});

const searchPlacas = (e: { query: string }) => {
    const q = e.query.toLowerCase();
    // Primero buscar en resultados actuales, luego en caché
    const pool = resultados.value.length
        ? resultados.value.map(r => ({ Placas: r.vehiculo?.Placas ?? '' })).filter(p => p.Placas)
        : todasPlacas.value;
    placasSuggestions.value = [...new Map(
        pool.filter(p => p.Placas.toLowerCase().includes(q)).map(p => [p.Placas, p])
    ).values()].slice(0, 20);
};

watch(placasQuery, (val) => {
    filters.value.placas = typeof val === 'string' ? val : (val as { Placas: string })?.Placas ?? '';
});

const buscar = async () => {
    loading.value = true;
    try {
        const params: Record<string, any> = {};
        if (filters.value.folio)     params.folio     = filters.value.folio;
        if (filters.value.placas)    params.placas    = filters.value.placas;
        if (filters.value.idCliente) params.idCliente = filters.value.idCliente;
        if (filters.value.fecha)     params.fecha     = filters.value.fecha instanceof Date
            ? filters.value.fecha.toISOString().split('T')[0]
            : filters.value.fecha;

        const { data } = await api.get('/exports/presupuesto/search', { params });
        resultados.value = data;

        if (!data.length)
            toast.add({ severity: 'info', summary: 'Sin resultados',
                detail: 'No hay registros con esos filtros.', life: 3000 });
    } catch {
        toast.add({ severity: 'error', summary: 'Error',
            detail: 'No se pudo realizar la búsqueda.', life: 4000 });
    } finally {
        loading.value = false;
    }
};

const limpiar = () => {
    filters.value      = { folio: '', placas: '', idCliente: null, fecha: null };
    folioQuery.value   = '';
    clienteQuery.value = '';
    placasQuery.value  = '';
    resultados.value   = [];
};

const formatFecha = (fecha: string | null) =>
    fecha ? new Date(fecha).toLocaleDateString('es-MX',
        { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—';

const descargarPdf = async (row: ServicioConsulta) => {
    exportingId.value = row.IdMovimiento;
    try {
        const params = { id: row.IdMovimiento };
        const { data, headers } = await api.get('/exports/presupuesto/pdf',
            { params, responseType: 'blob' });

        const contentType = headers['content-type'] ?? '';
        if (contentType.includes('application/json')) {
            const text = await (data as Blob).text();
            throw new Error(JSON.parse(text)?.message ?? 'Error al generar el PDF');
        }

        const url = URL.createObjectURL(data);
        const a   = document.createElement('a');
        a.href     = url;
        a.download = `presupuesto_OE${row.FolioOE ?? row.IdMovimiento}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (err: any) {
        toast.add({ severity: 'error', summary: 'Error',
            detail: err?.message ?? 'No se pudo generar el PDF.', life: 5000 });
    } finally {
        exportingId.value = null;
    }
};
</script>
