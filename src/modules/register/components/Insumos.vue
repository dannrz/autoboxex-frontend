    <template>
            <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
            <template #title>Insumos</template>
            <template #content>
                <DataTable :value="products" stripedRows tableStyle="min-width: 50rem">
                    <Column field="refaccion" header="Refacción"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="cantidad" header="Cantidad"></Column>
                    <Column field="precio" header="Precio"></Column>
                    <Column field="importe" header="Importe"></Column>
                </DataTable>
            </template>
            <template #footer>

            </template>
        </card>
    </template>
<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();

</script>
