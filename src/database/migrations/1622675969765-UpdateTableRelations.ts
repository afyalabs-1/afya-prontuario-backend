import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UpdateTableRelations1622675969765
  implements MigrationInterface
{
  name = 'UpdateTableRelations1622675969765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "clientId" TO "clientsId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "client_addresses_address" ("clientId" character varying(16) NOT NULL, "addressId" character varying(16) NOT NULL, CONSTRAINT "PK_8e384a7017aaa8c32521d4bc3d6" PRIMARY KEY ("clientId", "addressId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b0c70e7d6fe77edf5d86a14351" ON "client_addresses_address" ("clientId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1dac714682a85fcee7e58cf486" ON "client_addresses_address" ("addressId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_5bcd8efeaee2416ac288f8c9017" FOREIGN KEY ("clientsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client_addresses_address" ADD CONSTRAINT "FK_b0c70e7d6fe77edf5d86a143518" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client_addresses_address" ADD CONSTRAINT "FK_1dac714682a85fcee7e58cf4865" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_addresses_address" DROP CONSTRAINT "FK_1dac714682a85fcee7e58cf4865"`,
    );
    await queryRunner.query(
      `ALTER TABLE "client_addresses_address" DROP CONSTRAINT "FK_b0c70e7d6fe77edf5d86a143518"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_5bcd8efeaee2416ac288f8c9017"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_1dac714682a85fcee7e58cf486"`);
    await queryRunner.query(`DROP INDEX "IDX_b0c70e7d6fe77edf5d86a14351"`);
    await queryRunner.query(`DROP TABLE "client_addresses_address"`);
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "clientsId" TO "clientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_3d3e29e99d821fd75d7cb117e04" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
