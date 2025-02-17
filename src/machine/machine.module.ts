import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { DataSource } from 'typeorm';
import { Machine } from './machine.entity';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  controllers: [MachineController],
  providers: [
    ...databaseProviders,
    MachineService,
    {
      provide: 'MACHINE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Machine),
      inject: ['DATA_SOURCE'],
    },
  ]
})
export class MachineModule {}
