import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderInspectionController } from './production-order-inspection.controller';

describe('ProductionOrderInspectionController', () => {
  let controller: ProductionOrderInspectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionOrderInspectionController],
    }).compile();

    controller = module.get<ProductionOrderInspectionController>(ProductionOrderInspectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
