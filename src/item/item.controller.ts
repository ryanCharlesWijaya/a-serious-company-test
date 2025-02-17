import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';

@Controller('')
export class ItemController {
  constructor(private itemService: ItemService) { }

  @Get("/api/items")
  async index(): Promise<Record<string, any>> {
    const items: Item[] = await this.itemService.getAll();

    return {
      message: "success",
      data: items
    };
  }

  @Get("/api/items/:id")
  async get(
    @Param("id") id: number
  ): Promise<Record<string, any>> {
    const item: Item | null = await this.itemService.getById(id);

    return {
      message: "success",
      data: item
    };
  }

  @Post("/api/items/store")
  async store(
    @Body() data: Record<string, any>
  ): Promise<Record<string, any>> {
    const item: Item | null = await this.itemService.create(data);

    return {
      message: "success",
      data: item
    };
  }

  @Post("/api/items/:id/update")
  async update(
    @Body() data: Record<string, any>,
    @Param("id") id: number
  ): Promise<Record<string, any>> {
    const item: Item | null = await this.itemService.update(data, id);

    return {
      message: "success",
      data: item
    };
  }

  @Post("/api/items/:id/delete")
  async delete(
    @Param("id") id: number
  ): Promise<Record<string, any>> {
    await this.itemService.delete(id);

    return {
      message: "success",
    };
  }
}
