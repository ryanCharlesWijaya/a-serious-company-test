import { ProductionOrderItemMaterial } from "../production-order/production-order-item-material.entity";
import { ProductionOrderItem } from "../production-order/production-order-item.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Item
{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductionOrderItem, (productionOrderItem) => productionOrderItem.output_item,  {onDelete: "CASCADE"})
    production_order_items: ProductionOrderItem[];

    @OneToMany(() => ProductionOrderItemMaterial, (productionOrderItemMaterial) => productionOrderItemMaterial.item,  {onDelete: "CASCADE"})
    production_order_item_materials: ProductionOrderItemMaterial[]; 

    @Column({
        type: 'varchar',
        unique: true
    })
    name: string;

    @Column('int')
    quantity: number;

    @CreateDateColumn({
        transformer: {
            to(value: any) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    created_at: Date;

    @UpdateDateColumn({
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    updated_at: Date;
}