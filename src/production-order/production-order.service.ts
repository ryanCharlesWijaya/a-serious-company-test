import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductionOrder } from './production-order.entity';
import { ProductionOrderItem } from './production-order-item.entity';
import { ProductionOrderItemMaterial } from './production-order-item-material.entity';
import { ProductionOrderStage } from './production-order-stage.entity';
import { Item } from 'src/item/item.entity';

@Injectable()
export class ProductionOrderService {
  constructor(
    @Inject('ITEM_REPOSITORY') private itemRepository: Repository<Item>,
    @Inject('PRODUCTION_ORDER_REPOSITORY') private productionOrderRepository: Repository<ProductionOrder>,
    @Inject('PRODUCTION_ORDER_ITEM_REPOSITORY') private productionOrderItemRepository: Repository<ProductionOrderItem>,
    @Inject('PRODUCTION_ORDER_ITEM_MATERIAL_REPOSITORY') private productionOrderItemMaterialRepository: Repository<ProductionOrderItemMaterial>,
    @Inject('PRODUCTION_ORDER_STAGE_REPOSITORY') private productionOrderStageRepository: Repository<ProductionOrderStage>
  ) {}

  async getAll(): Promise<ProductionOrder[]>
  {
    const productionOrders = await this.productionOrderRepository.find();

    return productionOrders;
  }

  async getById(id: number): Promise<ProductionOrder>
  {
    const productionOrder = await this.productionOrderRepository.findOneOrFail({
      where: {
        id: id
      },
      relations: {
        production_order_stages: {
          machine: true
        },
        production_order_items: {
          output_item: true,
          production_order_item_materials: {
            item: true,
          },
        },
        production_order_inspections: true,
      }
    });

    return productionOrder;
  }

  async create(data: Record<string, any>) : Promise<ProductionOrder|null>
  {
    const productionOrder = await this.productionOrderRepository.create({
      status: data.status,
      scheduled_start_date: data.scheduled_start_date,
      scheduled_end_date: data.scheduled_end_date,
      actual_start_date: data?.actual_start_date ?? undefined,
      actual_end_date: data?.actual_end_date ?? undefined,
    });

    await this.productionOrderRepository.save(productionOrder);

    for (let i = 0; i < data.production_order_items.length; i++) {
      const production_order_item = data.production_order_items[i];

      const productionOrderItem = await this.productionOrderItemRepository.create({
        production_order: productionOrder,
        output_item: {id: data.production_order_items[i].output_item_id},
        quantity: data.production_order_items[i].quantity,
      });

      await this.productionOrderItemRepository.save(productionOrderItem);

      for (let j = 0; j < production_order_item.materials.length; j++) {
        const material = production_order_item.materials[j];

        const productionOrderItemMaterial = await this.productionOrderItemMaterialRepository.create({
          production_order_item: productionOrderItem,
          item: {id: material.item_id},
          quantity: material.quantity,
        });

        await this.productionOrderItemMaterialRepository.save(productionOrderItemMaterial);
      }
    }

    for (let i = 0; i < data.production_order_stages.length; i++) {
      const productionOrderStage = await this.productionOrderStageRepository.create({
        production_order: productionOrder,
        machine: { id: data.production_order_stages[i].machine_id },
        name: data.production_order_stages[i].name,
        status: "pending",
        scheduled_start_date: data.production_order_stages[i].scheduled_start_date,
        scheduled_end_date: data.production_order_stages[i].scheduled_end_date,
        actual_start_date: data.production_order_stages[i]?.actual_start_date ?? undefined,
        actual_end_date: data.production_order_stages[i]?.actual_end_date ?? undefined,
      });

      await this.productionOrderStageRepository.save(productionOrderStage);
    }

    await this.removeMaterialItems(await this.getById(productionOrder.id));

    return productionOrder;
  }

  async update(data: Record<string, any>, id: number) : Promise<ProductionOrder|null>
  {
    const productionOrder = await this.productionOrderRepository.findOneOrFail({
      where: {id: id},
      relations: {
        production_order_stages: {
          machine: true
        },
        production_order_items: {
          output_item: true,
          production_order_item_materials: {
            item: true,
          },
        },
        production_order_inspections: true,
      }
    });

    await this.productionOrderRepository.update(
      id,
      {
        status: data?.status ?? productionOrder?.status,
        scheduled_start_date: data?.scheduled_start_date ?? productionOrder?.scheduled_start_date,
        scheduled_end_date: data?.scheduled_end_date ?? productionOrder?.scheduled_end_date,
        actual_start_date: data?.actual_start_date ?? productionOrder?.actual_start_date ?? undefined,
        actual_end_date: data?.actual_end_date ?? productionOrder?.actual_end_date ?? undefined,
      }
    );

    if ((data?.status ?? productionOrder?.status) == "completed") {
      await this.addOutputItems(productionOrder);
    }

    let productionOrderItem: ProductionOrderItem;

    for (let i = 0; i < data.production_order_items.length; i++) {
      const production_order_item_data = data.production_order_items[i];

      await this.productionOrderItemRepository.update(
        production_order_item_data.id,
        {
          production_order: productionOrder,
          output_item: {id: production_order_item_data.output_item_id},
          quantity: production_order_item_data.quantity,
        }
      );

      productionOrderItem = await this.productionOrderItemRepository.findOneOrFail({
        where: {id: production_order_item_data.id}
      });
      
      for (let j = 0; j < production_order_item_data.materials.length; j++) {
        const material_data = production_order_item_data.materials[j];

        this.productionOrderItemMaterialRepository.update(
          material_data.id,
          {
            production_order_item: productionOrderItem,
            item: { id: material_data.item_id },
            quantity: material_data.quantity,
          }
        );
      }
    }

    for (let i = 0; i < data.production_order_stages.length; i++) {
      const productionOrderStage = await this.productionOrderStageRepository.update(
        data.production_order_stages[i].id,
        {
          machine: { id: data.production_order_stages[i].machine_id },
          name: data.production_order_stages[i].name,
          status: data.production_order_stages[i].status,
          scheduled_start_date: data.production_order_stages[i].scheduled_start_date,
          scheduled_end_date: data.production_order_stages[i].scheduled_end_date,
          actual_start_date: data.production_order_stages[i]?.actual_start_date ?? undefined,
          actual_end_date: data.production_order_stages[i]?.actual_end_date ?? undefined,
        }
      );
    }

    return await this.productionOrderRepository.findOneOrFail({where: {id: id}});
  }

  private async removeMaterialItems(productionOrder: ProductionOrder)
  {
    for (let i = 0; i < productionOrder.production_order_items.length; i++) {
      for (let j = 0; j < productionOrder.production_order_items[i].production_order_item_materials.length; j++) {
        this.itemRepository.update(
          productionOrder.production_order_items[i].production_order_item_materials[j].item.id,
          {
            quantity: productionOrder.production_order_items[i].production_order_item_materials[j].item.quantity - productionOrder.production_order_items[i].production_order_item_materials[j].quantity
          }
        );
      }
    }
  }

  private async addOutputItems(productionOrder: ProductionOrder)
  {
    for (let i = 0; i < productionOrder.production_order_items.length; i++) {
      this.itemRepository.update(
        productionOrder.production_order_items[i].output_item.id,
        {
          quantity: productionOrder.production_order_items[i].output_item.quantity + productionOrder.production_order_items[i].quantity
        }
      );
    }
  }

  async delete(id: number) : Promise<void>
  {
    await this.productionOrderRepository.delete({
      id: id
    });
  }
}
