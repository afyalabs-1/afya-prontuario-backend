import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProfession1622074939047 implements MigrationInterface {
    name = 'CreateProfession1622074939047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendance" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "schedulingDate" TIMESTAMP, "serviceDate" TIMESTAMP, "serviceTime" TIMESTAMP, "value" character varying, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "client_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying(14) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phoneNumber" character varying, "cellPhone" character varying NOT NULL, "birthDate" TIMESTAMP, "gender" "client_gender_enum", "profilePictureUrl" character varying NOT NULL, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialists" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "record" character varying(50) NOT NULL, "name" character varying(150) NOT NULL, "phoneNumber" character varying, "cellPhone" character varying NOT NULL, "email" character varying(255) NOT NULL, "professionId" character varying(16), CONSTRAINT "UQ_30c82e0f73a757a4bf4171cd7c1" UNIQUE ("record"), CONSTRAINT "PK_4bd10b339bf051026c8b6543911" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profession" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "specialists" ADD CONSTRAINT "FK_d0af7d3d65a5c0dc4c2c9c4451c" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialists" DROP CONSTRAINT "FK_d0af7d3d65a5c0dc4c2c9c4451c"`);
        await queryRunner.query(`DROP TABLE "profession"`);
        await queryRunner.query(`DROP TABLE "specialists"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "client_gender_enum"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
    }

}
