import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  providers: [
    ...databaseProviders,
    UsersService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
  ],
})
export class UsersModule {}
