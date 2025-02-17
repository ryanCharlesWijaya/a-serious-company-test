import { Module } from '@nestjs/common';
import { ProductionOrderInspectionController } from './production-order-inspection.controller';
import { ProductionOrderInspectionService } from './production-order-inspection.service';
import { ProductionOrderInspection } from './production-order-inspection.entity';
import { DataSource } from 'typeorm';
import { databaseProviders } from 'src/database/database.providers';
import { ProductionOrderModule } from 'src/production-order/production-order.module';

@Module({
  imports: [ProductionOrderModule],
  controllers: [ProductionOrderInspectionController],
  providers: [
    ...databaseProviders,
    ProductionOrderInspectionService,
    {
      provide: 'PRODUCTION_ORDER_INSPECTION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductionOrderInspection),
      inject: ['DATA_SOURCE'],
    },
  ]
})
export class ProductionOrderInspectionModule {}
