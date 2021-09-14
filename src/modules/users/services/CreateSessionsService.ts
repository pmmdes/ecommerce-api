import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import userRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

class CreateSessionsService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(userRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Incorrect email/password combination.", 401);
		}

		//comparando senha enviada com a senha do db
		const passwordCompare = await compare(password, user.password);

		if (!passwordCompare) {
			throw new AppError("Incorrect email/password combination.", 401);
		}

		const token = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return { user, token };
	}
}

export default CreateSessionsService;
