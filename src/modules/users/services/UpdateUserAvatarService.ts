import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import userRepository from "../typeorm/repositories/UsersRepository";
import uploadConfig from "@config/upload";
import path from "path";
import fs from "fs";

interface IRequest {
	user_id: string;
	avatarFile: string;
}

class UpdateUserAvatarService {
	public async execute({ user_id, avatarFile }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(userRepository);

		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User not found!", 404);
		}
		//Se já houver uma imagem cadastrada, deleta antes de atualizar
		if (user.avatar) {
			// .join(//caminho de onde os arquivos estão salvos, nome do arquivo)
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				user.avatar,
			);
			//Função do filesystem: verifica se o arquivo existe de fato
			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath,
			);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		//Após as verificações, atualiza o avatar
		user.avatar = avatarFile;

		await usersRepository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
