import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrderInspectionService } from './production-order-inspection.service';

describe('ProductionOrderInspectionService', () => {
  let service: ProductionOrderInspectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionOrderInspectionService],
    }).compile();

    service = module.get<ProductionOrderInspectionService>(ProductionOrderInspectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
