import Customer from "@modules/customers/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
	id: string;
}
class ShowCostumerService {
	public async execute({ id }: IRequest): Promise<Customer> {
		const costumersRepository = getCustomRepository(CustomersRepository);

		const costumer = await costumersRepository.findById(id);

		if (!costumer) {
			throw new AppError("Costumer not found.");
		}

		return costumer;
	}
}

export default ShowCostumerService;
