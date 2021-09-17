import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
	user_id: string;
	name: string;
	email: string;
	password?: string;
	old_password?: string;
}
class UpdateUserProfileService {
	public async execute({
		user_id,
		name,
		email,
		password,
		old_password,
	}: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User not found.");
		}

		const emailExists = await usersRepository.findByEmail(email);

		//Verifica se o email existe e se existir, verifica se o proprietário do email
		//é diferente do enviado pela requisição
		if (emailExists && emailExists.id !== user_id) {
			throw new AppError("There is already an user using this email.");
		}

		//Se a senha for passada, é obrigatório passar o old_password
		if (password && !old_password) {
			throw new AppError("Old password is required.");
		}

		//Se ambos os campos foram passados
		if (password && old_password) {
			const checkOldPassword = await compare(old_password, user.password);

			if (!checkOldPassword) {
				throw new AppError("Old password does not match");
			}
			user.password = await hash(password, 8);
		}

		user.name = name;
		user.email = email;

		await usersRepository.save(user);

		return user;
	}
}

export default UpdateUserProfileService;
