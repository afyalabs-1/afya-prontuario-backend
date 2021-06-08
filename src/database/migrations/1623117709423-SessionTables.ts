import {MigrationInterface, QueryRunner} from "typeorm";

export class SessionTables1623117709423 implements MigrationInterface {
    name = 'SessionTables1623117709423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_TOKEN"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "token" character varying(36) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_TOKEN" ON "session" ("token") `);
    }

}
