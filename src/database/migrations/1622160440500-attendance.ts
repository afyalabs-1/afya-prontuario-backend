import { MigrationInterface, QueryRunner } from 'typeorm';

export class attendance1622160440500 implements MigrationInterface {
  name = 'attendance1622160440500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attendance" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "schedulingDate" TIMESTAMP, "serviceDate" TIMESTAMP, "serviceTime" TIMESTAMP, "value" character varying, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "attendance"`);
  }
}
