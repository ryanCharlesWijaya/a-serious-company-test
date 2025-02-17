import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ProductionOrder } from "./production-order.entity";
import { Item } from "../item/item.entity";
import { ProductionOrderItemMaterial } from "./production-order-item-material.entity";

@Entity()
export class ProductionOrderItem
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductionOrder, (productionOrder) => productionOrder.production_order_items, {onDelete: "CASCADE"})
    @JoinColumn({ name: "production_order_id" })
    production_order: ProductionOrder;

    @ManyToOne(() => Item, (item) => item.production_order_items, {onDelete: "CASCADE"})
    @JoinColumn({ name: "output_item_id" })
    output_item: Item;

    @OneToMany(() => ProductionOrderItemMaterial, (item) => item.production_order_item, {onDelete: "CASCADE"})
    @JoinColumn({ name: "output_item_id" })
    production_order_item_materials: ProductionOrderItemMaterial[];

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