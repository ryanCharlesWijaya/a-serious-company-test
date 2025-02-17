<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, type Ref } from 'vue';


const props = defineProps(["productionOrderItems"]);

const items: Array<Record<string, any>> = reactive([]);

onMounted(() => {
    getItems();
});

const getItems = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/items`);

    Object.assign(items, data.data);
};

const addProductionOrderItem = async () => {
    props.productionOrderItems.push({
        materials: [{}]
    });
};

const removeProductionOrderItem = async (index: number) => {
    props.productionOrderItems.splice(index, 1);
};

const addProductionOrderItemMaterial = async (order_item_index: number) => {
    props.productionOrderItems[order_item_index].materials.push({
        materials: []
    });
};

const removeProductionOrderItemMaterial = async (order_item_index: number, index: number) => {
    props.productionOrderItems[order_item_index].materials.splice(index, 1);
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
                                <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
                                    Items
                                </h2>
                            </div>

                            <div class="min-w-0">
                                <button @click="addProductionOrderItem()" type="button" class="button button-primary">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div v-for="(productionOrderItemData, index) in props.productionOrderItems"  class="col col-span-12">
                            <div class="row">
                                <div class="col-span-5 mb-2">
                                    <label class="block text-sm/6 font-medium text-gray-900">Item</label>
                                    <div class="mt-2">
                                        <select
                                            type="text"
                                            name='output_item_id'
                                            id='output_item_id'
                                            v-model="productionOrderItemData.output_item_id"
                                            class="form-control"
                                            placeholder='Scheduled Start Date'>
                                            <template v-for="(item, index) in items">
                                                <option v-bind:value="item.id" v-text="item.name"></option>
                                            </template>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-span-5 mb-2">
                                    <label class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                                    <div class="mt-2">
                                        <input
                                            type="number"
                                            name='quantity'
                                            id='quantity'
                                            v-model="productionOrderItemData.quantity"
                                            class="form-control"
                                            placeholder='Quantity'>
                                    </div>
                                </div>
                                <div class="col-span-2 mb-2 flex items-end">
                                    <label class="block text-sm/6 font-medium text-gray-900">&nbsp;</label>
                                    <button @click="removeProductionOrderItem(index)" type="button" class="w-full button button-danger text-base sm:text-sm/6 mb-1">
                                        Remove
                                    </button>
                                </div>
                                <div class="col-span-12 mb-2">
                                    <div class="row w-full">
                                        <div class="col-span-12 card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-span-12 mb-2">
                                                        <div class="flex productionOrders-center justify-between mb-5">
                                                            <div class="min-w-0">
                                                                <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize">
                                                                    Materials
                                                                </h2>
                                                            </div>

                                                            <div class="min-w-0">
                                                                <button @click="addProductionOrderItemMaterial(index)" type="button" class="button button-primary">
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-for="(material, material_index) in productionOrderItemData.materials" class="col-span-12 mb-2">
                                                        <div class="row">
                                                            <div class="col-span-5 mb-2">
                                                                <label class="block text-sm/6 font-medium text-gray-900">Item</label>
                                                                <div class="mt-2">
                                                                    <select
                                                                        type="text"
                                                                        name='output_item_id'
                                                                        id='output_item_id'
                                                                        v-model="material.item_id"
                                                                        class="form-control"
                                                                        placeholder='Scheduled Start Date'>
                                                                        <template v-for="(item, index) in items">
                                                                            <option v-bind:value="item.id" v-text="item.name"></option>
                                                                        </template>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div class="col-span-5 mb-2">
                                                                <label class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                                                                <div class="mt-2">
                                                                    <input
                                                                        type="text"
                                                                        name='quantity'
                                                                        id='quantity'
                                                                        v-model="material.quantity"
                                                                        class="form-control"
                                                                        placeholder='Quantity'>
                                                                </div>
                                                            </div>

                                                            <div class="col-span-2 mb-2 flex items-end">
                                                                <label class="block text-sm/6 font-medium text-gray-900">&nbsp;</label>
                                                                <button @click="removeProductionOrderItemMaterial(index, material_index)" type="button" class="w-full button button-danger text-base sm:text-sm/6 mb-1">
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>