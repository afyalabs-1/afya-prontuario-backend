import { MigrationInterface, QueryRunner } from 'typeorm';

export class AttendanceRenameColumnSpecialist1622557259853
  implements MigrationInterface
{
  name = 'AttendanceRenameColumnSpecialist1622557259853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "idSpecilist" TO "idSpecialist"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" RENAME COLUMN "idSpecialist" TO "idSpecilist"`,
    );
  }
}
