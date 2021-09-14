import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("users") //nome da tabela
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column() //quando é string não é preciso especificar
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default User;
