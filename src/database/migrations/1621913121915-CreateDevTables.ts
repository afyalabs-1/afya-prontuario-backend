import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDevTables1621913121915 implements MigrationInterface {
    name = 'CreateDevTables1621913121915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "clients_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "clients_bloodtype_enum" AS ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying(14) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phoneNumber" character varying(15) NOT NULL, "cellPhone" character varying(15) NOT NULL, "birthDate" TIMESTAMP, "gender" "clients_gender_enum" NOT NULL, "bloodType" "clients_bloodtype_enum" NOT NULL, "profilePictureUrl" character varying NOT NULL, "addressId" character varying(16), CONSTRAINT "UQ_4245ac34add1ceeb505efc98777" UNIQUE ("cpf"), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "address_kind_enum" AS ENUM('HOME', 'BUSINESS')`);
        await queryRunner.query(`CREATE TABLE "address" ("id" character varying(16) NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "kind" "address_kind_enum" NOT NULL DEFAULT 'HOME', "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TYPE "address_kind_enum"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "clients_bloodtype_enum"`);
        await queryRunner.query(`DROP TYPE "clients_gender_enum"`);
    }

}
