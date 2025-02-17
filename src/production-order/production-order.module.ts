import { Module } from '@nestjs/common';
import { ProductionOrderController } from './production-order.controller';
import { ProductionOrderService } from './production-order.service';
import { DataSource } from 'typeorm';
import { ProductionOrder } from './production-order.entity';
import { ProductionOrderItem } from './production-order-item.entity';
import { ProductionOrderItemMaterial } from './production-order-item-material.entity';
import { ProductionOrderStage } from './production-order-stage.entity';
import { ProductionOrderInspection } from 'src/production-order-inspection/production-order-inspection.entity';
import { Machine } from 'src/machine/machine.entity';
import { databaseProviders } from 'src/database/database.providers';
import { ItemModule } from 'src/item/item.module';
import { Item } from 'src/item/item.entity';

@Module({
  imports: [
    ItemModule
  ],
  controllers: [ProductionOrderController],
  providers: [
    ...databaseProviders,
    {
      provide: 'ITEM_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PRODUCTION_ORDER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductionOrder),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PRODUCTION_ORDER_ITEM_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductionOrderItem),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PRODUCTION_ORDER_ITEM_MATERIAL_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductionOrderItemMaterial),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PRODUCTION_ORDER_STAGE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductionOrderStage),
      inject: ['DATA_SOURCE'],
    },
    ProductionOrderService
  ]
})
export class ProductionOrderModule {}
