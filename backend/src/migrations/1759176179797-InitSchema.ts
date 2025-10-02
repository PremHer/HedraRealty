import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1759176179797 implements MigrationInterface {
    name = 'InitSchema1759176179797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."financing_plans_plan_type_enum" AS ENUM('contado', 'financiado-inicial', 'financiado-sin-inicial', 'frances', 'aleman', 'japones')`);
        await queryRunner.query(`CREATE TABLE "financing_plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_id" uuid NOT NULL, "name" character varying(200) NOT NULL, "plan_type" "public"."financing_plans_plan_type_enum" NOT NULL, "interest_rate_annual" numeric(5,2) NOT NULL, "grace_period_months" integer NOT NULL, "installments" integer NOT NULL, "allow_zero_down_payment" boolean NOT NULL DEFAULT false, "penalty_rate_monthly" numeric(5,2) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'PEN', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_26ebb3aa117fc63303765683ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_id" uuid NOT NULL, "name" character varying(200) NOT NULL, "body" text NOT NULL, "placeholders" text array NOT NULL DEFAULT ARRAY[]::text[], "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_59af2fd9eadd293fe10fdb2c702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "generated_contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_id" uuid NOT NULL, "lot_id" uuid NOT NULL, "buyer_id" character varying(120) NOT NULL, "template_id" uuid NOT NULL, "generated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "content" text NOT NULL, CONSTRAINT "PK_5927babbd4391e18289a35c776a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."lots_status_enum" AS ENUM('available', 'reserved', 'sold')`);
        await queryRunner.query(`CREATE TABLE "lots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "block_id" uuid NOT NULL, "project_id" uuid NOT NULL, "code" character varying(50) NOT NULL, "area_m2" numeric(10,2) NOT NULL, "price_pen" numeric(12,2) NOT NULL, "status" "public"."lots_status_enum" NOT NULL DEFAULT 'available', "financing_plan_id" uuid, "buyer_id" character varying(120), "reservation_date" TIMESTAMP WITH TIME ZONE, "sale_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2bb990a4015865cb1daa1d22fd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_id" uuid NOT NULL, "code" character varying(20) NOT NULL, "description" text, "lot_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8244fa1495c4e9222a01059244b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cashflow_entries_type_enum" AS ENUM('ingreso', 'egreso')`);
        await queryRunner.query(`CREATE TABLE "cashflow_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_id" uuid NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "type" "public"."cashflow_entries_type_enum" NOT NULL, "description" text NOT NULL, "amount" numeric(14,2) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'PEN', "reference" character varying(120), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ef49da626ba1a6ad23533f79479" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."projects_type_enum" AS ENUM('lotizacion')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_id" uuid NOT NULL, "name" character varying(200) NOT NULL, "type" "public"."projects_type_enum" NOT NULL DEFAULT 'lotizacion', "total_area_m2" numeric(12,2) NOT NULL, "services" text array NOT NULL DEFAULT ARRAY[]::text[], "amenities" text array NOT NULL DEFAULT ARRAY[]::text[], "documentation" text array NOT NULL DEFAULT ARRAY[]::text[], "delivery_works" text array NOT NULL DEFAULT ARRAY[]::text[], "sales_progress" numeric(5,2) NOT NULL DEFAULT '0', "construction_progress" numeric(5,2) NOT NULL DEFAULT '0', "manager_id" character varying(120) NOT NULL, "launch_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "ruc" character varying(11) NOT NULL, "legal_address" character varying(300) NOT NULL, "general_manager_id" character varying(120) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1fe1a1fe5eaf15ada69b1b2e99f" UNIQUE ("ruc"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "financing_plans" ADD CONSTRAINT "FK_4981486ed6e13a888d89a41108c" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_templates" ADD CONSTRAINT "FK_94150e23d7061ffa666be96a779" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generated_contracts" ADD CONSTRAINT "FK_6c63638ad3b34d08ef618351e52" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generated_contracts" ADD CONSTRAINT "FK_ad7029e71dfc053f51b9b8c5d76" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generated_contracts" ADD CONSTRAINT "FK_ec66f5fc57c4968092bc779c2f8" FOREIGN KEY ("template_id") REFERENCES "contract_templates"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lots" ADD CONSTRAINT "FK_8176a0a24c352275a3309630362" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lots" ADD CONSTRAINT "FK_8e2926d83647fd36c2b35795288" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lots" ADD CONSTRAINT "FK_322fd1568fea5a2acd2bf3d39d7" FOREIGN KEY ("financing_plan_id") REFERENCES "financing_plans"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocks" ADD CONSTRAINT "FK_3b1a5d3c585f7105a1dbab2dad1" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cashflow_entries" ADD CONSTRAINT "FK_12360a6cfd2191d1f775e8a61e5" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c8708288b8e6a060ed7b9e1a226"`);
        await queryRunner.query(`ALTER TABLE "cashflow_entries" DROP CONSTRAINT "FK_12360a6cfd2191d1f775e8a61e5"`);
        await queryRunner.query(`ALTER TABLE "blocks" DROP CONSTRAINT "FK_3b1a5d3c585f7105a1dbab2dad1"`);
        await queryRunner.query(`ALTER TABLE "lots" DROP CONSTRAINT "FK_322fd1568fea5a2acd2bf3d39d7"`);
        await queryRunner.query(`ALTER TABLE "lots" DROP CONSTRAINT "FK_8e2926d83647fd36c2b35795288"`);
        await queryRunner.query(`ALTER TABLE "lots" DROP CONSTRAINT "FK_8176a0a24c352275a3309630362"`);
        await queryRunner.query(`ALTER TABLE "generated_contracts" DROP CONSTRAINT "FK_ec66f5fc57c4968092bc779c2f8"`);
        await queryRunner.query(`ALTER TABLE "generated_contracts" DROP CONSTRAINT "FK_ad7029e71dfc053f51b9b8c5d76"`);
        await queryRunner.query(`ALTER TABLE "generated_contracts" DROP CONSTRAINT "FK_6c63638ad3b34d08ef618351e52"`);
        await queryRunner.query(`ALTER TABLE "contract_templates" DROP CONSTRAINT "FK_94150e23d7061ffa666be96a779"`);
        await queryRunner.query(`ALTER TABLE "financing_plans" DROP CONSTRAINT "FK_4981486ed6e13a888d89a41108c"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_type_enum"`);
        await queryRunner.query(`DROP TABLE "cashflow_entries"`);
        await queryRunner.query(`DROP TYPE "public"."cashflow_entries_type_enum"`);
        await queryRunner.query(`DROP TABLE "blocks"`);
        await queryRunner.query(`DROP TABLE "lots"`);
        await queryRunner.query(`DROP TYPE "public"."lots_status_enum"`);
        await queryRunner.query(`DROP TABLE "generated_contracts"`);
        await queryRunner.query(`DROP TABLE "contract_templates"`);
        await queryRunner.query(`DROP TABLE "financing_plans"`);
        await queryRunner.query(`DROP TYPE "public"."financing_plans_plan_type_enum"`);
    }

}
