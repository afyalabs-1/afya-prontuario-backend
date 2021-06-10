import {MigrationInterface, QueryRunner} from "typeorm";

export class AuthTables1623109220009 implements MigrationInterface {
    name = 'AuthTables1623109220009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'EXPIRED', 'LOGOUT')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" "users_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

}
