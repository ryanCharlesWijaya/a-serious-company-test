import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";
import { ProductionOrderItem } from "./production-order-item.entity";
import { ProductionOrderInspection } from "../production-order-inspection/production-order-inspection.entity";
import { ProductionOrder } from "./production-order.entity";
import { Machine } from "../machine/machine.entity";

@Entity()
export class ProductionOrderStage
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductionOrder, (productionOrder) => productionOrder.production_order_stages, {onDelete: "CASCADE"})
    @JoinColumn({name: "production_order_id"})
    production_order: ProductionOrder;

    @OneToMany(() => ProductionOrderInspection, (productionOrderInspection) => productionOrderInspection.production_order_stage, {onDelete: "CASCADE"})
    production_order_inspections: ProductionOrderInspection[];

    @ManyToOne(() => Machine, (machine) => machine.production_order_stages, {onDelete: "CASCADE"})
    @JoinColumn({name: "machine_id"})
    machine: Machine;

    @Column("varchar")
    name: string;

    @Column("varchar")
    status: string;

    @Column({
        type: "timestamp",
        nullable: true,
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    scheduled_start_date: Date;

    @Column({
        type: "timestamp",
        nullable: true,
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    scheduled_end_date: Date;

    @Column({
        type: "timestamp",
        nullable: true,
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    actual_start_date: Date;

    @Column({
        type: "timestamp",
        nullable: true,
        transformer: {
            to(value: string) {
                return value;
            },
            from(value: Date) {
                return value?.toJSON().substring(0, 22) ?? "";
            }
        }
    })
    actual_end_date: Date;

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