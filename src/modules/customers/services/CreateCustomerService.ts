import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
	name: string;
	email: string;
}

class CreateCustomerService {
	public async execute({ name, email }: IRequest): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomerRepository);

		//verifica se existe um usuário com o mesmo email, atráves do método findByEmail, do repositório custom
		const emailExists = await customersRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError("There is already one customer with this email");
		}

		//Create (prepara o objeto)
		const customer = customersRepository.create({
			name: name,
			email: email,
		});

		//Save (de fato cria no db)
		await customersRepository.save(customer);

		return customer;
	}
}

export default CreateCustomerService;
