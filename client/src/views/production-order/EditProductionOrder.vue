<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProductionOrderItemList from './components/ProductionOrderItemList.vue';
import ProductionOrderStageList from './components/ProductionOrderStageList.vue';

const route = useRoute();

const productionOrderData: Record<string, any> = reactive({});

onMounted(async () => {
    getProductionOrder();
});

const getProductionOrder = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/production-orders/${route.params.productionOrderId}`);

    const newProductionOrderData: Record<string, any> = data.data;

    newProductionOrderData.production_order_stages.map((production_order_stage: Record<string, any>) => {
        production_order_stage.machine_id = production_order_stage.machine.id;

        return production_order_stage;
    });

    newProductionOrderData.production_order_items.map((production_order_item: Record<string, any>) => {
        production_order_item.output_item_id = production_order_item.output_item.id;
        production_order_item.materials = production_order_item.production_order_item_materials;

        production_order_item.materials.map((production_order_item_material: Record<string, any>) => {
            production_order_item_material.item_id = production_order_item_material.item.id;
        });

        return production_order_item;
    });

    Object.assign(productionOrderData, data.data);
}

const submit = async (e: Event) => {
    e.preventDefault();

    (e.target as HTMLInputElement)
        .reportValidity();

    const formData = {};

    Object.assign(formData, productionOrderData);

    const { data, status } = await axios.post(`http://localhost:3000/api/production-orders/${route.params.productionOrderId}/update`, formData);

    alert(data.message);

    if (status != 500) { router.push("/production-orders"); }
}
</script>

<template>
    <form @submit="submit" class="card">
        <div class="card-body grid grid-cols-12 gap-4">
            <div class="col-span-12 mb-2">
                <div class="flex productionOrders-center justify-between mb-5">
                    <div class="min-w-0">
                        <h2 class="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight capitalize">
                            Edit Production Order
                        </h2>
                    </div>

                    <div class="min-w-0">
                        <RouterLink :to="'/production-orders'" type="button" class="button button-primary">
                            Back 
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="col-span-12 mb-2">
                <label for="name" class="block text-sm/6 font-medium text-gray-900">Status</label>
                <div class="mt-2">
                    <select
                        type="text"
                        name='status'
                        id='status'
                        v-model="productionOrderData.status"
                        class="form-control"
                        placeholder='status'>
                        <option value="pending">pending</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
            </div>
            <div class="col-span-12 mb-2">
                <label for="name" class="block text-sm/6 font-medium text-gray-900">Scheduled Start Date</label>
                <div class="mt-2">
                    <input
                        type="datetime-local"
                        name='scheduled_start_date'
                        id='scheduled_start_date'
                        v-model="productionOrderData.scheduled_start_date"
                        class="form-control"
                        placeholder='Scheduled Start Date'>
                </div>
            </div>
            <div class="col-span-12 mb-2">
                <label for="name" class="block text-sm/6 font-medium text-gray-900">Scheduled End Date</label>
                <div class="mt-2">
                    <input
                        type="datetime-local"
                        name='scheduled_end_date'
                        id='scheduled_end_date'
                        v-model="productionOrderData.scheduled_end_date"
                        v-bind:min="productionOrderData.scheduled_start_date"
                        class="form-control"
                        placeholder='Scheduled End Date'>
                </div>
            </div>
            <div class="col-span-12 mb-2">
                <label for="name" class="block text-sm/6 font-medium text-gray-900">Actual Start Date</label>
                <div class="mt-2">
                    <input
                        type="datetime-local"
                        name='actual_start_date'
                        id='actual_start_date'
                        v-model="productionOrderData.actual_start_date"
                        class="form-control"
                        placeholder='Actual Start Date'>
                </div>
            </div>
            <div class="col-span-12 mb-2">
                <label for="name" class="block text-sm/6 font-medium text-gray-900">Actual End Date</label>
                <div class="mt-2">
                    <input
                        type="datetime-local"
                        name='actual_end_date'
                        id='actual_end_date'
                        v-model="productionOrderData.actual_end_date"
                        v-bind:min="productionOrderData.actual_start_date"
                        class="form-control"
                        placeholder='Actual End Date'>
                </div>
            </div>

            <ProductionOrderStageList :productionOrderStages="productionOrderData.production_order_stages" />

            <ProductionOrderItemList :productionOrderItems="productionOrderData.production_order_items" />

            <div class="col-span-12 mb-2">
                <button class="button button-primary">
                    Update
                </button>
            </div>
        </div>
    </form>
</template>
