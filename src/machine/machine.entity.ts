import { ProductionOrderStage } from "../production-order/production-order-stage.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Machine
{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductionOrderStage, (productionOrderStage) => productionOrderStage.machine, {onDelete: "CASCADE"})
    production_order_stages: ProductionOrderStage[];

    @Column({
        type: 'varchar',
        unique: true
    })
    name: string;

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