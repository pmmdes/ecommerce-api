import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
	id: string;
}

class DeleteUserService {
	public async execute({ id }: IRequest): Promise<void> {
		const userRepository = getCustomRepository(UsersRepository);

		await userRepository.delete(id);
	}
}

export default DeleteUserService;
