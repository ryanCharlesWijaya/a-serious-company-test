import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1739767158239 implements MigrationInterface {
    name = 'SchemaUpdate1739767158239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "name" character varying NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production_order_item_material" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "production_order_item_id" integer, "item_id" integer, CONSTRAINT "PK_dc9a47a1db87559d09fb508c42e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c6ae12601fed4e2ee5019544ddf" UNIQUE ("name"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production_order_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "production_order_id" integer, "output_item_id" integer, CONSTRAINT "PK_b058b51a12c92a39f587a056ed1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production_order" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "scheduled_start_date" TIMESTAMP NOT NULL, "scheduled_end_date" TIMESTAMP NOT NULL, "actual_start_date" TIMESTAMP, "actual_end_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e90e1070bf38dd156947f1322b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "machine" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c60541d21fe9d462cb49752d7de" UNIQUE ("name"), CONSTRAINT "PK_acc588900ffa841d96eb5fd566c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production_order_stage" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL, "scheduled_start_date" TIMESTAMP NOT NULL, "scheduled_end_date" TIMESTAMP NOT NULL, "actual_start_date" TIMESTAMP, "actual_end_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "production_order_id" integer, "machine_id" integer, CONSTRAINT "PK_059710397db88e5f76ba9b2ec93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production_order_inspection" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "production_order_id" integer, "production_order_stage_id" integer, CONSTRAINT "PK_57e9bd65ef89eb245d398a6ad80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "production_order_item_material" ADD CONSTRAINT "FK_d954af384ab9547e2f15c4922b8" FOREIGN KEY ("production_order_item_id") REFERENCES "production_order_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production_order_item_material" ADD CONSTRAINT "FK_93628f959d20fa5e86e96d2001e" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production_order_item" ADD CONSTRAINT "FK_aedf6a700bf2971714ee33dd3d8" FOREIGN KEY ("production_order_id") REFERENCES "production_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production_order_item" ADD CONSTRAINT "FK_9c5e16b0ee9030319916169af36" FOREIGN KEY ("output_item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production_order_stage" ADD CONSTRAINT "FK_fe33a61d5b8ab006ea68f49bea0" FOREIGN KEY ("production_order_id") REFERENCES "production_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production_order_stage" ADD CONSTRAINT "FK_242c22d1ba9455c57db0737a454" FOREIGN KEY ("machine_id") REFERENCES "machine"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production_order_inspection" ADD CONSTRAINT "FK_7974d22f519055bafa2f2698d31" FOREIGN KEY ("production_order_id") REFERENCES "production_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production_order_inspection" ADD CONSTRAINT "FK_c5e8870d0c196d8bfc802726ef0" FOREIGN KEY ("production_order_stage_id") REFERENCES "production_order_stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "production_order_inspection" DROP CONSTRAINT "FK_c5e8870d0c196d8bfc802726ef0"`);
        await queryRunner.query(`ALTER TABLE "production_order_inspection" DROP CONSTRAINT "FK_7974d22f519055bafa2f2698d31"`);
        await queryRunner.query(`ALTER TABLE "production_order_stage" DROP CONSTRAINT "FK_242c22d1ba9455c57db0737a454"`);
        await queryRunner.query(`ALTER TABLE "production_order_stage" DROP CONSTRAINT "FK_fe33a61d5b8ab006ea68f49bea0"`);
        await queryRunner.query(`ALTER TABLE "production_order_item" DROP CONSTRAINT "FK_9c5e16b0ee9030319916169af36"`);
        await queryRunner.query(`ALTER TABLE "production_order_item" DROP CONSTRAINT "FK_aedf6a700bf2971714ee33dd3d8"`);
        await queryRunner.query(`ALTER TABLE "production_order_item_material" DROP CONSTRAINT "FK_93628f959d20fa5e86e96d2001e"`);
        await queryRunner.query(`ALTER TABLE "production_order_item_material" DROP CONSTRAINT "FK_d954af384ab9547e2f15c4922b8"`);
        await queryRunner.query(`DROP TABLE "production_order_inspection"`);
        await queryRunner.query(`DROP TABLE "production_order_stage"`);
        await queryRunner.query(`DROP TABLE "machine"`);
        await queryRunner.query(`DROP TABLE "production_order"`);
        await queryRunner.query(`DROP TABLE "production_order_item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "production_order_item_material"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
