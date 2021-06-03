import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTables1622332041576 implements MigrationInterface {
  name = 'CreateTables1622332041576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "client" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying(11) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phoneNumber" character varying(15), "cellPhone" character varying(15) NOT NULL, "birthDate" date, "gender" "client_gender_enum" NOT NULL, "bloodType" "client_bloodtype_enum" NOT NULL, "profilePictureUrl" character varying, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "kind" "address_kind_enum" NOT NULL DEFAULT 'HOME', "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" "address_state_enum" NOT NULL DEFAULT 'AC', "postalCode" character varying NOT NULL, "clientId" character varying(16), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_EMAIL_UNIQUE"`);
    await queryRunner.query(`DROP INDEX "IDX_EMAILCONFIRMATIONCODE_UNIQUE"`);
    await queryRunner.query(`DROP INDEX "IDX_PASSWORDRESETCODE_UNIQUE"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "client"`);
  }
}
