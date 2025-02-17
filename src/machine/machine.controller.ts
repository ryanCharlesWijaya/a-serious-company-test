import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MachineService } from './machine.service';
import { Machine } from './machine.entity';

@Controller('')
export class MachineController {
    constructor(private machineService: MachineService) {}

    @Get("/api/machines")
    async index(): Promise<Record<string, any>>
    {
        const machines: Machine[] = await this.machineService.getAll();

        return {
            message: "success",
            data: machines
        };
    }

    @Get("/api/machines/:id")
    async get(
        @Param("id") id: number
    ): Promise<Record<string, any>>
    {
        const machine: Machine|null = await this.machineService.getById(id);

        return {
            message: "success",
            data: machine
        };
    }

    @Post("/api/machines/store")
    async store(
        @Body() data: Record<string, any>
    ): Promise<Record<string, any>>
    {
        const machine: Machine|null = await this.machineService.create(data);

        return {
            message: "success",
            data: machine
        };
    }

    @Post("/api/machines/:id/update")
    async update(
        @Body() data: Record<string, any>,
        @Param("id") id: number
    ): Promise<Record<string, any>>
    {
        const machine: Machine|null = await this.machineService.update(data, id);

        return {
            message: "success",
            data: machine
        };
    }

    @Post("/api/machines/:id/delete")
    async delete(
        @Param("id") id: number
    ): Promise<Record<string, any>>
    {
        await this.machineService.delete(id);

        return {
            message: "success",
        };
    }
}
