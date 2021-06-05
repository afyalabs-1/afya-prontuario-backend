import { MigrationInterface, QueryRunner } from 'typeorm';

export class EstruturandoAtendimento1622833304397
  implements MigrationInterface
{
  name = 'EstruturandoAtendimento1622833304397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "idClient"`);
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP COLUMN "idSpecialist"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "idSpecialist" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "idClient" character varying`,
    );
  }
}
