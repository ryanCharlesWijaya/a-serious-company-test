import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from '@/views/item/ItemList.vue'
import ProductionOrderView from '@/views/ProductionOrderView.vue'
import ProductionOrderInspectionView from '@/views/ProductionOrderInspectionView.vue'
import CreateItem from '@/views/item/CreateItem.vue'
import ItemList from '@/views/item/ItemList.vue'
import EditItem from '@/views/item/EditItem.vue'
import MachineList from '@/views/machine/MachineList.vue'
import CreateMachine from '@/views/machine/CreateMachine.vue'
import EditMachine from '@/views/machine/EditMachine.vue'
import ProductionOrderList from '@/views/production-order/ProductionOrderList.vue'
import CreateProductionOrder from '@/views/production-order/CreateProductionOrder.vue'
import EditProductionOrder from '@/views/production-order/EditProductionOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/items',
      children: [
        {
          path: '',
          name: 'items',
          component: ItemList,
        },
        {
          path: 'create',
          name: 'items.create',
          component: CreateItem,
        },
        {
          path: ':itemId/edit',
          name: 'items.edit',
          component: EditItem,
        },
      ]
    },

    {
      path: '/machines',
      children: [
        {
          path: '',
          name: 'machines',
          component: MachineList,
        },
        {
          path: 'create',
          name: 'machines.create',
          component: CreateMachine,
        },
        {
          path: ':machineId/edit',
          name: 'machines.edit',
          component: EditMachine,
        },
      ]
    },

    {
      path: '/production-orders',
      children: [
        {
          path: '',
          name: 'production-orders',
          component: ProductionOrderList,
        },
        {
          path: 'create',
          name: 'production-orders.create',
          component: CreateProductionOrder,
        },
        {
          path: ':productionOrderId/edit',
          name: 'production-orders.edit',
          component: EditProductionOrder,
        },
      ]
    },
    {
      path: '/production-order-inspections',
      name: 'production-order-inspections',
      component: ProductionOrderInspectionView,
    },
  ],
})

export default router
