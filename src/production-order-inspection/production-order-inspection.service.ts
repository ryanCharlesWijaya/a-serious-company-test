import { Inject, Injectable } from '@nestjs/common';
import { ProductionOrderInspection } from './production-order-inspection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionOrderInspectionService {
    constructor(
        @Inject('PRODUCTION_ORDER_INSPECTION_REPOSITORY') private productionOrderInspectionRepository: Repository<ProductionOrderInspection>
      ) {}
    
      async getAll(): Promise<ProductionOrderInspection[]>
      {
        const productionOrderInspections = await this.productionOrderInspectionRepository.find();
    
        return productionOrderInspections;
      }
    
      async getById(id: number): Promise<ProductionOrderInspection|null>
      {
        const productionOrderInspection = await this.productionOrderInspectionRepository.findOne({
          where: {
            id: id
          },
          relations: {
            production_order_stage: true,
            production_order:true,
          }
        });
    
        return productionOrderInspection;
      }
    
      async create(data: Record<string, any>) : Promise<ProductionOrderInspection|null>
      {
        const productionOrderInspection = await this.productionOrderInspectionRepository.create({
            production_order: {id: data.production_order_id},
            production_order_stage: {id: data.production_order_stage_id},
            status: data.status,
        });

        await this.productionOrderInspectionRepository.save(productionOrderInspection);
    
        return productionOrderInspection;
      }
    
      async update(data: Record<string, any>, id: number) : Promise<ProductionOrderInspection|null>
      {
        const productionOrderInspection = await this.productionOrderInspectionRepository.findOne({where: {id: id}});
    
        await this.productionOrderInspectionRepository.update(
          id,
          {
            status: data.status,
          }
        );
    
        return await this.productionOrderInspectionRepository.findOne({where: {id: id}});
      }
    
      async delete(id: number) : Promise<void>
      {
        await this.productionOrderInspectionRepository.delete({
          id: id
        });
      }
}
