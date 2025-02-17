<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import { onMounted, reactive, ref, type Ref } from 'vue';
import axios from 'axios';
import router from '@/router';
import { redirect } from '@/helpers/router';

DataTable.use(DataTablesCore);

const productionOrdersData: Array<any> = reactive([]);

const columns = [
    {data: 'id', title: 'ID' },
    {data: 'status', title: 'Status' },
    {data: 'scheduled_start_date', title: 'Scheduled Start Date' },
    {data: 'scheduled_end_date', title: 'Scheduled End Date' },
    {data: 'actual_start_date', title: 'Actual Start Date' },
    {data: 'actual_end_date', title: 'Actual End Date' },
    {data: 'created_at', title: 'Created At' },
    {data: 'updated_at', title: 'Updated At' },
    {data: 'id', title: 'Action' }
];

onMounted(async () => {
    getProductionOrders();
});

const getProductionOrders = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/production-orders`, {});

    productionOrdersData.length = 0;

    data.data.forEach((productionOrderData: any) => {
        productionOrdersData.push(productionOrderData);
    });
}

const deleteProductionOrder = async (productionOrderId: number) => {
    const { data, status } = await axios.post(`http://localhost:3000/api/production-orders/${productionOrderId}/delete`);

    if (status !== 500) getProductionOrders();
}

</script>

<template>
    <div class="card">
        <div class="card-body grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <div class="flex productionOrders-center justify-between mb-5">
                    <div class="min-w-0">
                        <h2
                            class="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight capitalize">
                            Production Order List
                        </h2>
                    </div>

                    <div class="min-w-0">
                        <RouterLink :to="'/production-orders/create'" class="button button-primary">
                            Create Production Order
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="col-span-12">
                <DataTable :columns="columns" :data="productionOrdersData" class="display">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Scheduled Start Date</th>
                            <th>Scheduled End Date</th>
                            <th>Actual Start Date</th>
                            <th>Actual End Date</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <template #column-8="props">
                        <button @click="redirect('/production-orders/' + props.rowData.id + '/edit')"
                            class="button button-primary mr-2">
                            Edit
                        </button>

                        <button @click="deleteProductionOrder(props.rowData.id)" class="button button-danger">
                            Delete
                        </button>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
</template>
