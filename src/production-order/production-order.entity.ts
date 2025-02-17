import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";
import { ProductionOrderItem } from "./production-order-item.entity";
import { ProductionOrderInspection } from "../production-order-inspection/production-order-inspection.entity";
import { ProductionOrderStage } from "./production-order-stage.entity";

@Entity()
export class ProductionOrder
{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductionOrderItem, (productionOrderItem) => productionOrderItem.production_order, {onDelete: "CASCADE"})
    production_order_items: ProductionOrderItem[];

    @OneToMany(() => ProductionOrderStage, (productionOrderStage) => productionOrderStage.production_order, {onDelete: "CASCADE"})
    production_order_stages: ProductionOrderStage[];

    @OneToMany(() => ProductionOrderInspection, (productionOrderInspection) => productionOrderInspection.production_order, {onDelete: "CASCADE"})
    production_order_inspections: ProductionOrderInspection[];

    @Column("varchar")
    status: string;

    @Column({
        type: "timestamp",
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    scheduled_start_date : Date;

    @Column({
        type: "timestamp",
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    scheduled_end_date : Date;

    @Column({
        type: "timestamp",
        nullable: true,
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value
                    ? value.toJSON().substring(0, 22)
                    : value;
            }
        }
    })
    actual_start_date : Date;

    @Column({
        type: "timestamp",
        nullable: true,
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value !== null
                    ? value.toJSON().substring(0, 22)
                    : value;
            }
        }
    })
    actual_end_date : Date;

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