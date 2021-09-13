import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IRequest): Promise<Product> {
		const productsRepository = getCustomRepository(ProductRepository);

		//Procura produto específico
		const product = await productsRepository.findOne(id);

		//Se não existir
		if (!product) {
			throw new AppError("Product not found.");
		}
		//Verificar se o nome desejado pra alteração já está em uso
		const productExists = await productsRepository.findByName(name);

		if (productExists) {
			throw new AppError("There is already one product with this name");
		}

		product.name = name;
		product.price = price;
		product.quantity = quantity;

		await productsRepository.save(product);

		return product;
	}
}

export default UpdateProductService;
