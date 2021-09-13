import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1631323141597 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "products",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid", //aqui poderia ser definido "increment"
						default: "uuid_generate_v4()",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "price",
						type: "decimal",
						precision: 10,
						scale: 2,
					},
					{
						name: "quantity",
						type: "int",
					},
					{
						name: "created_at",
						type: "timestamp with time zone",
						default: "now()",
					},
					{
						name: "updated_at",
						type: "timestamp with time zone",
						default: "now()",
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("products");
	}
}
