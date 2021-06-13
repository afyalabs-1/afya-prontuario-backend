import {MigrationInterface, QueryRunner} from "typeorm";

export class ProdTables1623606366926 implements MigrationInterface {
    name = 'ProdTables1623606366926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profession" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_record" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "openDate" TIMESTAMP, "clientId" character varying(16), CONSTRAINT "PK_d96ede886356ac47ddcbb0bf3a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_record_detail" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "dateTime" TIMESTAMP, "description" character varying, "specialistsId" character varying(16), "attendanceId" character varying(16), "medicalRecordId" character varying(16), CONSTRAINT "PK_2253e8bb34c642256649587109b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialists" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "crm" character varying(50) NOT NULL, "name" character varying(150) NOT NULL, "phoneNumber" character varying, "cellPhone" character varying NOT NULL, "email" character varying(255) NOT NULL, "professionId" character varying(16), CONSTRAINT "UQ_d8b3bc865106728bcc9a7d6c546" UNIQUE ("crm"), CONSTRAINT "UQ_0bc4417325031b5d7ffddcea076" UNIQUE ("email"), CONSTRAINT "PK_4bd10b339bf051026c8b6543911" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "attendance_status_enum" AS ENUM('SCHEDULED', 'ACCOMPLISHED', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "schedulingDate" TIMESTAMP, "serviceDate" TIMESTAMP, "serviceTime" TIMESTAMP, "value" character varying, "status" "attendance_status_enum", "clientId" character varying(16), "specialistsId" character varying(16), CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "client_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "client_bloodtype_enum" AS ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying(11) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phoneNumber" character varying(15), "cellPhone" character varying(15) NOT NULL, "birthDate" date, "gender" "client_gender_enum" NOT NULL, "bloodType" "client_bloodtype_enum" NOT NULL, "profilePictureUrl" character varying, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "address_kind_enum" AS ENUM('HOME', 'BUSINESS')`);
        await queryRunner.query(`CREATE TYPE "address_state_enum" AS ENUM('AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO')`);
        await queryRunner.query(`CREATE TABLE "address" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "kind" "address_kind_enum" NOT NULL DEFAULT 'HOME', "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" "address_state_enum" NOT NULL DEFAULT 'AC', "postalCode" character varying NOT NULL, "clientsId" character varying(16), "specialistsId" character varying(16), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('USER', 'ADMINISTRATOR')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "role" "users_role_enum" NOT NULL DEFAULT 'USER', "userName" character varying(20) NOT NULL, "password" character varying(60), "name" character varying(255), "passwordResetCode" character varying(255), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "session_status_enum" AS ENUM('ACTIVE', 'EXPIRED', 'LOGOUT')`);
        await queryRunner.query(`CREATE TABLE "session" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "ipAddress" character varying(255), "userAgent" character varying(1023), "status" "session_status_enum" NOT NULL DEFAULT 'ACTIVE', "userId" character varying(16), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medical_record" ADD CONSTRAINT "FK_8a3c253c9c4d9e9e87b71ffe0ee" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_record_detail" ADD CONSTRAINT "FK_0a789c826c0f4b1341d9ddaa6a9" FOREIGN KEY ("specialistsId") REFERENCES "specialists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_record_detail" ADD CONSTRAINT "FK_ee787d4333edb6ab204a31ea90c" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_record_detail" ADD CONSTRAINT "FK_8d9efe53b45dfc3cad23ee62a38" FOREIGN KEY ("medicalRecordId") REFERENCES "medical_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specialists" ADD CONSTRAINT "FK_d0af7d3d65a5c0dc4c2c9c4451c" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7df51ca68d842297d387aeb48ba" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_fff59102bef58a0728f4d77d000" FOREIGN KEY ("specialistsId") REFERENCES "specialists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_5bcd8efeaee2416ac288f8c9017" FOREIGN KEY ("clientsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_e8dbdf0d899df91ad994e703b44" FOREIGN KEY ("specialistsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_e8dbdf0d899df91ad994e703b44"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_5bcd8efeaee2416ac288f8c9017"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_fff59102bef58a0728f4d77d000"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7df51ca68d842297d387aeb48ba"`);
        await queryRunner.query(`ALTER TABLE "specialists" DROP CONSTRAINT "FK_d0af7d3d65a5c0dc4c2c9c4451c"`);
        await queryRunner.query(`ALTER TABLE "medical_record_detail" DROP CONSTRAINT "FK_8d9efe53b45dfc3cad23ee62a38"`);
        await queryRunner.query(`ALTER TABLE "medical_record_detail" DROP CONSTRAINT "FK_ee787d4333edb6ab204a31ea90c"`);
        await queryRunner.query(`ALTER TABLE "medical_record_detail" DROP CONSTRAINT "FK_0a789c826c0f4b1341d9ddaa6a9"`);
        await queryRunner.query(`ALTER TABLE "medical_record" DROP CONSTRAINT "FK_8a3c253c9c4d9e9e87b71ffe0ee"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TYPE "session_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TYPE "address_state_enum"`);
        await queryRunner.query(`DROP TYPE "address_kind_enum"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "client_bloodtype_enum"`);
        await queryRunner.query(`DROP TYPE "client_gender_enum"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "specialists"`);
        await queryRunner.query(`DROP TABLE "medical_record_detail"`);
        await queryRunner.query(`DROP TABLE "medical_record"`);
        await queryRunner.query(`DROP TABLE "profession"`);
    }

}
