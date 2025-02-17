<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const isSidebarOpen = ref(true);
const showLogo = ref(true);
const route = useRoute();

const routes = ref([
    { path: '/', name: 'Home', icon: 'fas fa-home' },
    { path: '/items', name: 'Item', icon: 'fas fa-info-circle' },
    { path: '/machines', name: 'Machine', icon: 'fas fa-envelope' },
    { path: '/production-orders', name: 'Production Orders', icon: 'fas fa-envelope' },
    { path: '/production-order-inspections', name: 'Production Order Inspections', icon: 'fas fa-envelope' },
]);

const currentRouteName = computed(() => {
    const matchedRoute = route.matched[0];
    return matchedRoute ? matchedRoute.name : 'Home';
});

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
    <div id="app" class="min-h-full">
        <nav class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="hidden md:block">
                            <div class="flex items-baseline space-x-4">
                                <div v-for="route in routes" :key="route.path" class="">
                                    <router-link :to="route.path" :class="{
                                        'bg-gray-900': route.path === $route.path,
                                        'text-white': route.path === $route.path,
                                        'text-gray-300': route.path !== $route.path,
                                        'hover:bg-gray-700': route.path !== $route.path,
                                        'hover:text-white': route.path !== $route.path
                                    }" class="rounded-md px-3 py-2 text-sm font-medium p">
                                        <span :class="{ 'hidden': !isSidebarOpen }">{{ route.name }}</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div class="md:hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <div v-for="route in routes" :key="route.path" class="">
                        <router-link :to="route.path" :class="{
                            'bg-gray-900': route.path === $route.path,
                            'text-white': route.path === $route.path,
                            'text-gray-300': route.path !== $route.path,
                            'hover:bg-gray-700': route.path !== $route.path,
                            'hover:text-white': route.path !== $route.path
                        }" class="block rounded-md px-3 py-2 text-base font-medium">
                            <span :class="{ 'hidden': !isSidebarOpen }">{{ route.name }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>