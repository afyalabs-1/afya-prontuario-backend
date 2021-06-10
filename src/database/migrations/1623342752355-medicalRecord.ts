import { MigrationInterface, QueryRunner } from 'typeorm';

export class medicalRecord1623342752355 implements MigrationInterface {
  name = 'medicalRecord1623342752355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medical_record" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "openDate" TIMESTAMP, "clientId" character varying(16), CONSTRAINT "PK_d96ede886356ac47ddcbb0bf3a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record" ADD CONSTRAINT "FK_8a3c253c9c4d9e9e87b71ffe0ee" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_record" DROP CONSTRAINT "FK_8a3c253c9c4d9e9e87b71ffe0ee"`,
    );
    await queryRunner.query(`DROP TABLE "medical_record"`);
  }
}
