import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import DeleteUserService from "../services/DeleteUserService";

export default class UsersController {
	public async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const listUser = new ListUserService();

		//console.log(request.user.id);

		const users = await listUser.execute();

		return response.json(users);
	}

	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name: name,
			email: email,
			password: password,
		});

		return response.json(user);
	}

	public async delete(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.params;

		const deleteUser = new DeleteUserService();

		await deleteUser.execute({ id });

		return response.json([]);
	}
}
