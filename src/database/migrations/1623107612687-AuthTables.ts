import {MigrationInterface, QueryRunner} from "typeorm";

export class AuthTables1623107612687 implements MigrationInterface {
    name = 'AuthTables1623107612687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "session_status_enum" AS ENUM('ACTIVE', 'EXPIRED', 'LOGOUT')`);
        await queryRunner.query(`CREATE TABLE "session" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying(36) NOT NULL, "ipAddress" character varying(255), "userAgent" character varying(1023), "status" "session_status_enum" NOT NULL DEFAULT 'ACTIVE', "userId" character varying(16), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_TOKEN" ON "session" ("token") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying(36) NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_TOKEN"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TYPE "session_status_enum"`);
    }

}
