<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue';


const props = defineProps(["productionOrderStages"]);

const machines: Array<Record<string, any>> = reactive([]);

onMounted(() => {
    getMachines();
});

const getMachines = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/machines`);

    Object.assign(machines, data.data);
};

const addProductionOrderStage = async () => {
    props.productionOrderStages.push({});
};

const removeProductionOrderStage = async (index: number) => {
    props.productionOrderStages.splice(index, 1);
};

</script>

<template>
    <div class="col-span-12 mb-2">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-span-12 mb-2">
                        <div class="flex productionOrders-center justify-between mb-5">
                            <div class="min-w-0">
                                <h2 class="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight capitalize">
                                    Production Order Stages
                                </h2>
                            </div>

                            <div class="min-w-0">
                                <button @click="addProductionOrderStage()" type="button" class="button button-primary">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-for="(productionOrderStageData, index) in props.productionOrderStages"  class="col col-span-12">
                    <div class="row mb-5">
                        <div class="col-span-12 mb-2">
                            <div class="mt-2">
                                <input
                                    type="text"
                                    name='name'
                                    id='name'
                                    v-model="productionOrderStageData.name"
                                    class="form-control"
                                    placeholder='Name'>
                            </div>
                        </div>
                        <div class="col-span-2 mb-2">
                            <label for="name" class="block text-sm/6 font-medium text-gray-900">Scheduled Start Date</label>
                            <div class="mt-2">
                                <input
                                    type="datetime-local"
                                    name='scheduled_start_date'
                                    id='scheduled_start_date'
                                    v-model="productionOrderStageData.scheduled_start_date"
                                    v-bind:min="
                                        (props.productionOrderStages[index-1] != undefined)
                                            ? props.productionOrderStages[index-1].scheduled_start_date
                                            : undefined
                                    "
                                    class="form-control"
                                    placeholder='Scheduled Start Date'>
                            </div>
                        </div>
                        <div class="col-span-2 mb-2">
                            <label for="name" class="block text-sm/6 font-medium text-gray-900">Scheduled End Date</label>
                            <div class="mt-2">
                                <input
                                    type="datetime-local"
                                    name='scheduled_end_date'
                                    id='scheduled_end_date'
                                    v-model="productionOrderStageData.scheduled_end_date"
                                    v-bind:min="productionOrderStageData.scheduled_start_date"
                                    class="form-control"
                                    placeholder='Scheduled End Date'>
                            </div>
                        </div>
                        <div class="col-span-2 mb-2">
                            <label for="name" class="block text-sm/6 font-medium text-gray-900">Actual Start Date</label>
                            <div class="mt-2">
                                <input
                                    type="datetime-local"
                                    name='actual_start_date'
                                    id='actual_start_date'
                                    v-model="productionOrderStageData.actual_start_date"
                                    v-bind:min="
                                        (props.productionOrderStages[index-1] != undefined)
                                            ? props.productionOrderStages[index-1].actual_start_date
                                            : undefined
                                    "
                                    class="form-control"
                                    placeholder='Actual Start Date'>
                            </div>
                        </div>
                        <div class="col-span-2 mb-2">
                            <label for="name" class="block text-sm/6 font-medium text-gray-900">Actual End Date</label>
                            <div class="mt-2">
                                <input
                                    type="datetime-local"
                                    name='actual_end_date'
                                    id='actual_end_date'
                                    v-model="productionOrderStageData.actual_end_date"
                                    v-bind:min="productionOrderStageData.actual_start_date"
                                    class="form-control"
                                    placeholder='Actual End Date'>
                            </div>
                        </div>
                        <div class="col-span-2 mb-2">
                            <label for="name" class="block text-sm/6 font-medium text-gray-900">Machine</label>
                            <div class="mt-2">
                                <select
                                    type="text"
                                    name='machine_id'
                                    id='machine_id'
                                    v-model="productionOrderStageData.machine_id"
                                    class="form-control"
                                    placeholder='Machine'>
                                    <template v-for="(machine, machine_index) in machines">
                                        <option v-bind:value="machine.id" v-text="machine.name"></option>
                                    </template>
                                </select>
                            </div>
                        </div>

                        <div class="col-span-2 mb-2">
                            <label for="name" class="block text-sm/6 font-medium text-gray-900">Status</label>
                            <div class="mt-2">
                                <select
                                    type="text"
                                    name='status'
                                    id='status'
                                    v-model="productionOrderStageData.status"
                                    class="form-control"
                                    placeholder='status'>
                                    <option value="pending">pending</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>