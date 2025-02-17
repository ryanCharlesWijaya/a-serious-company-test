import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { SetMetadata } from '@nestjs/common';
import { databaseProviders } from 'src/database/database.providers';
import { DataSource } from 'typeorm';
import { Item } from './item.entity';

@Module({
  controllers: [ItemController],
  providers: [
    ...databaseProviders,
    ItemService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    {
      provide: 'ITEM_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
      inject: ['DATA_SOURCE'],
    },
  ]
})
export class ItemModule {}
