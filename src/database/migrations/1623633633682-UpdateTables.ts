import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTables1623633633682 implements MigrationInterface {
    name = 'UpdateTables1623633633682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialists" ADD "profilePictureUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialists" DROP COLUMN "profilePictureUrl"`);
    }

}
