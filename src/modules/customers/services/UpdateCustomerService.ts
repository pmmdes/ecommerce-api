import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "@modules/customers/typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
	id: string;
	name: string;
	email: string;
}
class UpdateCustomerService {
	public async execute({ id, name, email }: IRequest): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomersRepository);

		const customer = await customersRepository.findById(id);

		if (!customer) {
			throw new AppError("Customer  not found.");
		}

		const customerExists = await customersRepository.findByEmail(email);

		//Verifica se o customer existe e se existir, verifica se o proprietário do email
		//é diferente do enviado pela requisição
		if (customerExists && customerExists.email !== email) {
			throw new AppError(
				"There is already an customer using this email.",
			);
		}

		customer.name = name;
		customer.email = email;

		await customersRepository.save(customer);

		return customer;
	}
}

export default UpdateCustomerService;
