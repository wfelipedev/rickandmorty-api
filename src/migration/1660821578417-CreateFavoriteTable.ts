import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFavoriteTable1660821578417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorites',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'char_id',
            type: 'integer'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'status',
            type: 'varchar'
          },
          {
            name: 'species',
            type: 'varchar'
          },
          {
            name: 'type',
            type: 'varchar'
          },
          {
            name: 'gender',
            type: 'varchar'
          },
          {
            name: 'origin_id',
            type: 'uuid'
          },
          {
            name: 'location_id',
            type: 'uuid'
          },
          {
            name: 'user_id',
            type: 'uuid'
          },
          {
            name: 'image',
            type: 'varchar'
          },
          {
            name: 'url',
            type: 'varchar'
          },
          {
            name: 'created',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorites')
  }
}
