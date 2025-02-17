import { Inject, Injectable } from '@nestjs/common';
import { Machine } from './machine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachineService {
  constructor(
    @Inject('MACHINE_REPOSITORY') private machineRepository: Repository<Machine>
  ) { }

  async getAll(): Promise<Machine[]> {
    const machines = await this.machineRepository.find();

    return machines;
  }

  async getById(id: number): Promise<Machine | null> {
    const machine = await this.machineRepository.findOne({
      where: {
        id: id
      },
      relations: {
        production_order_stages: true,
      }
    });

    return machine;
  }

  async create(data: Record<string, any>): Promise<Machine | null> {
    const machine = await this.machineRepository.create({
      name: data.name,
    });

    await this.machineRepository.save(machine);

    return machine;
  }

  async update(data: Record<string, any>, id: number): Promise<Machine | null> {
    const machine = await this.machineRepository.findOne({ where: { id: id } });

    await this.machineRepository.update(
      id,
      {
        name: data?.name ?? machine?.name,
      }
    );

    return await this.machineRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.machineRepository.delete({
      id: id
    });
  }
}
