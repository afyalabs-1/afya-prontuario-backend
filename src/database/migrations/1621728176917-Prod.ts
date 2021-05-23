import { MigrationInterface, QueryRunner } from 'typeorm';

export class Prod1621728176917 implements MigrationInterface {
	name = 'Prod1621728176917';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "client_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`,
		);
		await queryRunner.query(
			`CREATE TABLE "client" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying(14) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phoneNumber" character varying, "cellPhone" character varying NOT NULL, "birthDate" TIMESTAMP, "gender" "client_gender_enum", "profilePictureUrl" character varying NOT NULL, CONSTRAINT "UQ_9921dca81551c93e5a459ef03ce" UNIQUE ("cpf"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "client"`);
		await queryRunner.query(`DROP TYPE "client_gender_enum"`);
	}
}
