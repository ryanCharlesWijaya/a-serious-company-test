<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import { onMounted, reactive, ref, type Ref } from 'vue';
import axios from 'axios';
import router from '@/router';
import { redirect } from '@/helpers/router';

DataTable.use(DataTablesCore);

const machinesData: Array<any> = reactive([]);

const columns = [
  { data: 'name', title: 'Name' },
  { data: 'created_at', title: 'Created At' },
  { data: 'updated_at', title: 'Updated At' },
  { data: 'id', title: 'Action' }
];

onMounted(async () => {
    getMachines();
});

const getMachines = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/machines`, {});

    machinesData.length = 0;

    data.data.forEach((machineData: any) => {
        machinesData.push(machineData);
    });
}

const deleteMachine = async (machineId: number) => {
    const { data, status } = await axios.post(`http://localhost:3000/api/machines/${machineId}/delete`);

    if (status !== 500) getMachines();
}

</script>

<template>
    <div class="card">
        <div class="card-body grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <div class="flex machines-center justify-between mb-5">
                    <div class="min-w-0">
                        <h2 class="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight capitalize">
                            Machine List    
                        </h2>
                    </div>

                    <div class="min-w-0">
                        <RouterLink :to="'/machines/create'" class="button button-primary">
                            Create Machine
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="col-span-12">
                <DataTable
                    :columns="columns"
                    :data="machinesData"
                    class="display">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <template #column-3="props">
                        <button @click="redirect('/machines/' + props.rowData.id + '/edit')" class="button button-primary mr-2">
                            Edit
                        </button>

                        <button @click="deleteMachine(props.rowData.id)" class="button button-danger">
                            Delete
                        </button>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
</template>
