import { Inject, Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
	constructor(
		@Inject('ITEM_REPOSITORY') private itemRepository: Repository<Item>
	) { }

	async getAll(): Promise<Item[]> {
		const items = await this.itemRepository.find({});

		return items;
	}

	async getById(id: number): Promise<Item | null> {
		const item = await this.itemRepository.findOne({
			where: {
				id: id
			},
			relations: {
				production_order_items: true,
			}
		});

		return item;
	}

	async create(data: Record<string, any>): Promise<Item | null> {
		const item = await this.itemRepository.create({
			name: data.name,
			quantity: data.quantity
		});

		await this.itemRepository.save(item);

		return item;
	}

	async update(data: Record<string, any>, id: number): Promise<Item | null> {
		const item = await this.itemRepository.findOne({ where: { id: id } });

		await this.itemRepository.update(
			id,
			{
				name: data?.name ?? item?.name,
				quantity: data?.quantity ?? item?.quantity,
			}
		);

		return await this.itemRepository.findOne({ where: { id: id } });
	}

	async delete(id: number): Promise<void> {
		await this.itemRepository.delete({
			id: id
		});
	}
}
