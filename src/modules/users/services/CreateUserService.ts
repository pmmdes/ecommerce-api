import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import userRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
	name: string;
	email: string;
	password: string;
	//avatar: string;
}

class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(userRepository);

		//verifica se existe um usuário com o mesmo email, atráves do método findByEmail, do repositório custom
		const emailExists = await usersRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError("There is already one user with this email");
		}
		//criptografando senha
		const hashedPassword = await hash(password, 8);

		//Create (prepara o objeto)
		const user = usersRepository.create({
			name: name,
			email: email,
			password: hashedPassword,
		});

		//Save (de fato cria no db)
		await usersRepository.save(user);

		return user;
	}
}

export default CreateUserService;
