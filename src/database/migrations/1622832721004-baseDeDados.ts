import {MigrationInterface, QueryRunner} from "typeorm";

export class baseDeDados1622832721004 implements MigrationInterface {
    name = 'baseDeDados1622832721004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "client_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "client_bloodtype_enum" AS ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying(11) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phoneNumber" character varying(15), "cellPhone" character varying(15) NOT NULL, "birthDate" date, "gender" "client_gender_enum" NOT NULL, "bloodType" "client_bloodtype_enum" NOT NULL, "profilePictureUrl" character varying, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "address_kind_enum" AS ENUM('HOME', 'BUSINESS')`);
        await queryRunner.query(`CREATE TYPE "address_state_enum" AS ENUM('AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO')`);
        await queryRunner.query(`CREATE TABLE "address" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "kind" "address_kind_enum" NOT NULL DEFAULT 'HOME', "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" "address_state_enum" NOT NULL DEFAULT 'AC', "postalCode" character varying NOT NULL, "clientsId" character varying(16), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "attendance_status_enum" AS ENUM('SCHEDULED', 'ACCOMPLISHED', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "schedulingDate" TIMESTAMP, "serviceDate" TIMESTAMP, "serviceTime" TIMESTAMP, "value" character varying, "status" "attendance_status_enum", "idClient" character varying, "idSpecialist" character varying, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialists" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "record" character varying(50) NOT NULL, "name" character varying(150) NOT NULL, "phoneNumber" character varying, "cellPhone" character varying NOT NULL, "email" character varying(255) NOT NULL, "professionId" character varying(16), CONSTRAINT "PK_4bd10b339bf051026c8b6543911" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profession" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('USER', 'ADMINISTRATOR')`);
        await queryRunner.query(`CREATE TYPE "user_status_enum" AS ENUM('UNCONFIRMED_EMAIL', 'APPROVAL_PENDING', 'ACTIVE')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "role" "user_role_enum" NOT NULL DEFAULT 'USER', "status" "user_status_enum" NOT NULL DEFAULT 'ACTIVE', "email" character varying(255) NOT NULL, "password" character varying(60), "name" character varying(255), "emailConfirmationCode" character varying(255), "passwordResetCode" character varying(255), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_PASSWORDRESETCODE_UNIQUE" ON "user" ("passwordResetCode") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_EMAILCONFIRMATIONCODE_UNIQUE" ON "user" ("emailConfirmationCode") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_EMAIL_UNIQUE" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "client_addresses_address" ("clientId" character varying(16) NOT NULL, "addressId" character varying(16) NOT NULL, CONSTRAINT "PK_8e384a7017aaa8c32521d4bc3d6" PRIMARY KEY ("clientId", "addressId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0c70e7d6fe77edf5d86a14351" ON "client_addresses_address" ("clientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1dac714682a85fcee7e58cf486" ON "client_addresses_address" ("addressId") `);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_5bcd8efeaee2416ac288f8c9017" FOREIGN KEY ("clientsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specialists" ADD CONSTRAINT "FK_d0af7d3d65a5c0dc4c2c9c4451c" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_addresses_address" ADD CONSTRAINT "FK_b0c70e7d6fe77edf5d86a143518" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_addresses_address" ADD CONSTRAINT "FK_1dac714682a85fcee7e58cf4865" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_addresses_address" DROP CONSTRAINT "FK_1dac714682a85fcee7e58cf4865"`);
        await queryRunner.query(`ALTER TABLE "client_addresses_address" DROP CONSTRAINT "FK_b0c70e7d6fe77edf5d86a143518"`);
        await queryRunner.query(`ALTER TABLE "specialists" DROP CONSTRAINT "FK_d0af7d3d65a5c0dc4c2c9c4451c"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_5bcd8efeaee2416ac288f8c9017"`);
        await queryRunner.query(`DROP INDEX "IDX_1dac714682a85fcee7e58cf486"`);
        await queryRunner.query(`DROP INDEX "IDX_b0c70e7d6fe77edf5d86a14351"`);
        await queryRunner.query(`DROP TABLE "client_addresses_address"`);
        await queryRunner.query(`DROP INDEX "IDX_EMAIL_UNIQUE"`);
        await queryRunner.query(`DROP INDEX "IDX_EMAILCONFIRMATIONCODE_UNIQUE"`);
        await queryRunner.query(`DROP INDEX "IDX_PASSWORDRESETCODE_UNIQUE"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_status_enum"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "profession"`);
        await queryRunner.query(`DROP TABLE "specialists"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TYPE "address_state_enum"`);
        await queryRunner.query(`DROP TYPE "address_kind_enum"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "client_bloodtype_enum"`);
        await queryRunner.query(`DROP TYPE "client_gender_enum"`);
    }

}
