import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";

interface IRequest {
	token: string;
	password: string;
}

class ResetPasswordService {
	public async execute({ token, password }: IRequest): Promise<void> {
		const usersRepository = getCustomRepository(UsersRepository);

		const userTokensRepository = getCustomRepository(UserTokensRepository);

		const userToken = await userTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError("User token does not exists.");
		}

		const user = await usersRepository.findById(userToken.user_id);

		if (!user) {
			throw new AppError("User not exists.");
		}

		//Adiciona duas horas ao horário de criação do token
		const expiresDate = addHours(userToken.created_at, 2);

		//Compara se a hora atual passou do prazo máximo estipulado
		if (isAfter(Date.now(), expiresDate)) {
			throw new AppError("Token expired.");
		}

		user.password = await hash(password, 8);

		await usersRepository.save(user);
	}
}

export default ResetPasswordService;
