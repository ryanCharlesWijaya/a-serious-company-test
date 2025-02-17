import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductionOrderService } from './production-order.service';
import { ProductionOrder } from './production-order.entity';

@Controller('')
export class ProductionOrderController {
	constructor(private productionOrderService: ProductionOrderService) {}

	@Get("/api/production-orders")
	async index(): Promise<Record<string, any>>
	{
		const productionOrders: ProductionOrder[] = await this.productionOrderService.getAll();

		return {
			message: "success",
			data: productionOrders
		};
	}

	@Get("/api/production-orders/:id")
	async get(@Param("id") id: number): Promise<Record<string, any>>
	{
		const productionOrder = await this.productionOrderService.getById(id);

		return {
			message: "success",
			data: productionOrder
		};
	}

	@Post("/api/production-orders/store")
	async store(@Body() body: Record<string, any>): Promise<Record<string, any>>
	{
		const productionOrder = await this.productionOrderService.create({
			status: "pending",
			scheduled_start_date: body.scheduled_start_date,
			scheduled_end_date: body.scheduled_end_date,
			actual_start_date: body?.actual_start_date ?? null,
			actual_end_date: body?.actual_end_date ?? null,
			production_order_stages: body.production_order_stages,
			production_order_items: body.production_order_items,
		});

		return {
			message: "success",
			data: productionOrder
		};
	}

	@Post("/api/production-orders/:id/update")
	async update(
		@Body() body: Record<string, any>,
		@Param("id") id: number
	): Promise<Record<string, any>>
	{
		const productionOrder = await this.productionOrderService.update({
			status: body.status,
			scheduled_start_date: body.scheduled_start_date,
			scheduled_end_date: body.scheduled_end_date,
			actual_start_date: body?.actual_start_date ?? null,
			actual_end_date: body?.actual_end_date ?? null,
			production_order_stages: body.production_order_stages,
			production_order_items: body.production_order_items,
		}, id);

		return {
			message: "success",
			data: productionOrder
		};
	}

	@Post("/api/production-orders/:id/delete")
	async delete(
		@Param("id") id: number
	): Promise<Record<string, any>>
	{
		await this.productionOrderService.delete(id);

		return {
			message: "success"
		};
	}
}
