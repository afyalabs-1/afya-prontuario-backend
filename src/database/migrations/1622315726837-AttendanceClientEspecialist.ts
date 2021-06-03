import { MigrationInterface, QueryRunner } from 'typeorm';

export class AttendanceClientEspecialist1622315726837
  implements MigrationInterface
{
  name = 'AttendanceClientEspecialist1622315726837';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "idClient" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "idSpecilist" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP COLUMN "idSpecilist"`,
    );
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "idClient"`);
  }
}
