import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacionandoTabelas1622833133314 implements MigrationInterface {
  name = 'RelacionandoTabelas1622833133314';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
