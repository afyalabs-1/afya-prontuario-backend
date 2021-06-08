import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTables1623190554925 implements MigrationInterface {
    name = 'UpdateTables1623190554925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_PASSWORDRESETCODE_UNIQUE" ON "users" ("passwordResetCode") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_PASSWORDRESETCODE_UNIQUE"`);
    }

}
