<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import { onMounted, reactive, ref, type Ref } from 'vue';
import axios from 'axios';
import router from '@/router';
import { redirect } from '@/helpers/router';

DataTable.use(DataTablesCore);

const itemsData: Array<any> = reactive([]);

const columns = [
  { data: 'name', title: 'Name' },
  { data: 'quantity', title: 'Quantity' },
  { data: 'created_at', title: 'Created At' },
  { data: 'updated_at', title: 'Updated At' },
  { data: 'id', title: 'Action' }
];

onMounted(async () => {
    getItems();
});

const getItems = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/items`, {});

    itemsData.length = 0;

    data.data.forEach((itemData: any) => {
        itemsData.push(itemData);
    });
}

const deleteItem = async (itemId: number) => {
    const { data, status } = await axios.post(`http://localhost:3000/api/items/${itemId}/delete`);

    if (status !== 500) getItems();
}

</script>

<template>
    <div class="card">
        <div class="card-body grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <div class="flex items-center justify-between mb-5">
                    <div class="min-w-0">
                        <h2 class="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight capitalize">
                            Item List    
                        </h2>
                    </div>

                    <div class="min-w-0">
                        <RouterLink :to="'/items/create'" class="button button-primary">
                            Create Item
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="col-span-12">
                <DataTable
                    :columns="columns"
                    :data="itemsData"
                    class="display">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <template #column-4="props">
                        <button @click="redirect('/items/' + props.rowData.id + '/edit')" class="button button-primary mr-2">
                            Edit
                        </button>

                        <button @click="deleteItem(props.rowData.id)" class="button button-danger">
                            Delete
                        </button>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
</template>
