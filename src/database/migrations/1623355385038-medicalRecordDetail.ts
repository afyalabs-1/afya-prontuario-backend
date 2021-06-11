import { MigrationInterface, QueryRunner } from 'typeorm';

export class medicalRecordDetail1623355385038 implements MigrationInterface {
  name = 'medicalRecordDetail1623355385038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medical_record_detail" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "dateTime" TIMESTAMP, "description" character varying, "specialistsId" character varying(16), "attendanceId" character varying(16), "medicalRecordId" character varying(16), CONSTRAINT "PK_2253e8bb34c642256649587109b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record_detail" ADD CONSTRAINT "FK_0a789c826c0f4b1341d9ddaa6a9" FOREIGN KEY ("specialistsId") REFERENCES "specialists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record_detail" ADD CONSTRAINT "FK_ee787d4333edb6ab204a31ea90c" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record_detail" ADD CONSTRAINT "FK_8d9efe53b45dfc3cad23ee62a38" FOREIGN KEY ("medicalRecordId") REFERENCES "medical_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_record_detail" DROP CONSTRAINT "FK_8d9efe53b45dfc3cad23ee62a38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record_detail" DROP CONSTRAINT "FK_ee787d4333edb6ab204a31ea90c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record_detail" DROP CONSTRAINT "FK_0a789c826c0f4b1341d9ddaa6a9"`,
    );
    await queryRunner.query(`DROP TABLE "medical_record_detail"`);
  }
}
