<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const itemData: Record<string, any> = reactive({
    name: undefined,
    quantity: undefined,
});

onMounted(async () => {
    getItem();
});

const getItem = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/items/${route.params.itemId}`);

    Object.assign(itemData, data.data);
}

const submit = async (e: Event) => {
    e.preventDefault();

    (e.target as HTMLInputElement)
        .reportValidity();

    const formData = {};

    Object.assign(formData, itemData);

    const { data, status } = await axios.post(`http://localhost:3000/api/items/${route.params.itemId}/update`, formData);

    alert(data.message);

    if (status != 500) { router.push("/items"); }
}
</script>

<template>
    <form @submit="submit" class="card">
        <div class="card-body grid grid-cols-12 gap-4">
            <div class="col-span-12 mb-2">
                <div class="flex items-center justify-between mb-5">
                    <div class="min-w-0">
                        <h2 class="text-2xl font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight capitalize">
                            Edit Item
                        </h2>
                    </div>

                    <div class="min-w-0">
                        <RouterLink :to="'/items'" type="button" class="button button-primary">
                            Back 
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="col-span-12 mb-2">
                <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
                <div class="mt-2">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        v-model="itemData.name"
                        class="form-control"
                        placeholder="Name">
                </div>
            </div>

            <div class="col-span-12 mb-2">
                <label for="quantity" class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                <div class="mt-2">
                    <input
                        type="text"
                        name="quantity"
                        id="quantity"
                        v-model="itemData.quantity"
                        class="form-control"
                        placeholder="Quantity">
                </div>
            </div>

            <div class="col-span-12 mb-2">
                <button class="button button-primary">
                    Update
                </button>
            </div>
        </div>
    </form>
</template>
