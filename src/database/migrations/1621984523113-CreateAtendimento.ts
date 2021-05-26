import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAtendimento1621984523113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },

          {
            name: 'schedulingDate',
            type: 'timestamp',
            default: 'now()',
          },

          {
            name: 'serviceDate',
            type: 'timestamp',
          },

          {
            name: 'serviceTime',
            type: 'timestamp',
          },

          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendance');
  }
}
