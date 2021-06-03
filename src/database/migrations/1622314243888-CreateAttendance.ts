import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAttendance1622314243888 implements MigrationInterface {
  name = 'CreateAttendance1622314243888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "attendance_status_enum" AS ENUM('SCHEDULED', 'ACCOMPLISHED', 'CANCELED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendance" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "schedulingDate" TIMESTAMP, "serviceDate" TIMESTAMP, "serviceTime" TIMESTAMP, "value" character varying, "status" "attendance_status_enum", CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "attendance"`);
    await queryRunner.query(`DROP TYPE "attendance_status_enum"`);
  }
}
