import { MigrationInterface, QueryRunner } from 'typeorm';

export class CampoDetailEmAttendance1623688074623
  implements MigrationInterface
{
  name = 'CampoDetailEmAttendance1623688074623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "details" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "details"`);
  }
}
