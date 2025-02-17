import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const PostgreSqlDataSource = new DataSource({
    type: 'postgres',
    host: '192.168.0.43',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'a-serious-company-test',
    entities: [
        __dirname + "/../**/*.entity.{js,ts}"
    ],
    migrations: [
        __dirname + "/../../migrations/*.{js,ts}"
    ],
    synchronize: true
});

export const databaseProviders = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () => {
            return PostgreSqlDataSource.initialize();
        }
    }
];
