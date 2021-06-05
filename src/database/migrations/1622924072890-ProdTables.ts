import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ProdTables1622924072890 implements MigrationInterface {
  name = 'ProdTables1622924072890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "role" "user_role_enum" NOT NULL DEFAULT 'USER', "status" "user_status_enum" NOT NULL DEFAULT 'ACTIVE', "email" character varying(255) NOT NULL, "password" character varying(60), "name" character varying(255), "emailConfirmationCode" character varying(255), "passwordResetCode" character varying(255), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_PASSWORDRESETCODE_UNIQUE" ON "user" ("passwordResetCode") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_EMAILCONFIRMATIONCODE_UNIQUE" ON "user" ("emailConfirmationCode") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_EMAIL_UNIQUE" ON "user" ("email") `,
    );
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "idClient"`);
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP COLUMN "idSpecialist"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "clientId" character varying(16)`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "specialistsId" character varying(16)`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_7df51ca68d842297d387aeb48ba" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_fff59102bef58a0728f4d77d000" FOREIGN KEY ("specialistsId") REFERENCES "specialists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_fff59102bef58a0728f4d77d000"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_7df51ca68d842297d387aeb48ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP COLUMN "specialistsId"`,
    );
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "clientId"`);
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "idSpecialist" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD "idClient" character varying`,
    );
    await queryRunner.query(`DROP INDEX "IDX_EMAIL_UNIQUE"`);
    await queryRunner.query(`DROP INDEX "IDX_EMAILCONFIRMATIONCODE_UNIQUE"`);
    await queryRunner.query(`DROP INDEX "IDX_PASSWORDRESETCODE_UNIQUE"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
