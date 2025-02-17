import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    email: string;

    @Column('varchar')
    name: string;

    @Column('text')
    password: string;

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