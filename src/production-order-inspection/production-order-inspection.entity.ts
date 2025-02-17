import { ProductionOrderStage } from "../production-order/production-order-stage.entity";
import { ProductionOrder } from "../production-order/production-order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class ProductionOrderInspection
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductionOrder, (productionOrder) => productionOrder.production_order_inspections, {onDelete: "CASCADE"})
    @JoinColumn({name: "production_order_id"})
    production_order: ProductionOrder;

    @ManyToOne(() => ProductionOrderStage, (productionOrderStage) => productionOrderStage.production_order_inspections, {onDelete: "CASCADE"})
    @JoinColumn({name: "production_order_stage_id"})
    production_order_stage: ProductionOrderStage;

    @Column("varchar")
    status: string;   

    @CreateDateColumn({
        transformer: {
            to(value: string) {
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