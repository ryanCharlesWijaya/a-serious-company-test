import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductionOrderController } from './production-order/production-order.controller';
import { ProductionOrderService } from './production-order/production-order.service';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { ProductionOrderInspectionService } from './production-order-inspection/production-order-inspection.service';
import { ProductionOrderInspectionController } from './production-order-inspection/production-order-inspection.controller';
import { MachineController } from './machine/machine.controller';
import { MachineService } from './machine/machine.service';
import { AuthModule } from './auth/auth.module';
import { MachineModule } from './machine/machine.module';
import { ItemModule } from './item/item.module';
import { ProductionOrderModule } from './production-order/production-order.module';
import { ProductionOrderInspectionModule } from './production-order-inspection/production-order-inspection.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { ProductionOrderInspection } from './production-order-inspection/production-order-inspection.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    ItemModule,
    MachineModule,
    ProductionOrderModule,
    ProductionOrderInspectionModule,
    UsersModule,
    DatabaseModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
