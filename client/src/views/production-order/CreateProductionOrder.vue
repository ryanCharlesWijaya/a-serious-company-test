<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { onMounted, reactive, watch, type Ref } from 'vue';
import ProductionOrderStageList from './components/ProductionOrderStageList.vue';
import ProductionOrderItemList from './components/ProductionOrderItemList.vue';

const props = defineProps([
    'productionOrderId',
]);

const productionOrderData: Record<string, any> = reactive({
    name: undefined,
    status: undefined,
    scheduled_start_date: undefined,
    scheduled_end_date: undefined,
    actual_start_date: undefined,
    actual_end_date: undefined,
    production_order_items: [
        {materials: [{}]}
    ],
    production_order_stages: [
        {}
    ],
});

watch(
    () => productionOrderData.scheduled_start_date,
    (newValue: any, oldValue: any) => {
        productionOrderData.scheduled_end_date = undefined;
    },
);

watch(
    () => productionOrderData.actual_start_date,
    (newValue: any, oldValue: any) => {
        productionOrderData.actual_end_date = undefined;
    },
);


const submit = async (e: Event) => {
    e.preventDefault();

    (e.target as HTMLInputElement)
        .reportValidity();

    const formData = {};

    Object.assign(formData, productionOrderData);

    const { data, status } = await axios.post(`http://localhost:3000/api/production-orders/store`, formData);

    alert(data.message);

    if (status == 201) { router.push("/production-orders"); }
}
</script>

<template>
    <form @submit="submit" class="card">
        <div class="card-body grid grid-cols-12 gap-4">
            <div class="col-span-12 mb-2">
                <div class="flex productionOrders-center justify-between mb-5">
                    <div class="min-w-0">
                        <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
                            Create Production Order
                        </h2>
                    </div>

                    <div class="min-w-0">
                        <RouterLink :to="'/production-orders'" class="button button-primary">
                            Back To Router List
                        </RouterLink>
                    </div>
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
                <button type='submit' class="button button-primary">
                    Create
                </button>
            </div>
        </div>
    </form>
</template>
