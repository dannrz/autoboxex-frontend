import { api } from "@/api/baseApi";

const download = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const fetchBlob = async (path: string, params?: Record<string, any>): Promise<Blob> => {
    const { data, headers } = await api.get(path, { params, responseType: 'blob' });

    // Si el server devuelve un error JSON en lugar del archivo, lo relanzamos
    const contentType = headers['content-type'] ?? '';
    if (contentType.includes('application/json')) {
        const text = await (data as Blob).text();
        throw new Error(JSON.parse(text)?.message ?? 'Error al generar el archivo');
    }

    return data as Blob;
};

export const ExportService = {
    async excelByFolio(folio: number) {
        const blob = await fetchBlob('/exports/excel', { folio });
        download(blob, `orden_servicio_${folio}.xlsx`);
    },

    async excelByCliente(idCliente: number) {
        const blob = await fetchBlob('/exports/excel', { idCliente });
        download(blob, `servicios_cliente_${idCliente}.xlsx`);
    },

    async excelAll() {
        const blob = await fetchBlob('/exports/excel/all');
        download(blob, 'servicios_todos.xlsx');
    },

    async pdfByFolio(folio: number) {
        const blob = await fetchBlob('/exports/pdf', { folio });
        download(blob, `orden_servicio_${folio}.pdf`);
    },

    async pdfById(id: number) {
        const blob = await fetchBlob('/exports/pdf', { id });
        download(blob, `orden_servicio_${id}.pdf`);
    },
};
