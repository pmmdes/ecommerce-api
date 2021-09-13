import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

class ListProductService {
	//retorna array de produtos
	public async execute(): Promise<Product[]> {
		const productsRepository = getCustomRepository(ProductRepository);

		//Procura todos os produtos
		const products = productsRepository.find();

		return products;
	}
}

export default ListProductService;
