import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("products") //nome da tabela
class Product {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column() //quando é string não é preciso especificar
	name: string;

	@Column("decimal")
	price: number;

	@Column("int")
	quantity: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Product;
