import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductionOrderItem } from "./production-order-item.entity";
import { Item } from "../item/item.entity";

@Entity()
export class ProductionOrderItemMaterial
{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => ProductionOrderItem, (productionOrderItem) => productionOrderItem.production_order_item_materials, {onDelete: "CASCADE"})
    @JoinColumn({name: "production_order_item_id"})
    production_order_item: ProductionOrderItem;

    @ManyToOne(() => Item, (item) => item.production_order_item_materials, {onDelete: "CASCADE"})
    @JoinColumn({name: "item_id"})
    item: Item;

    @Column("int")
    quantity: number;

    @CreateDateColumn(({
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    }))
    created_at: Date;

    @UpdateDateColumn(({
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    }))
    updated_at: Date;
}