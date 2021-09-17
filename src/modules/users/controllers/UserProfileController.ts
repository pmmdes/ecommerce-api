import { Request, Response } from "express";
import ShowUserProfileService from "../services/ShowUserProfileService";
import UpdateUserProfileService from "../services/UpdateUserProfileService";

export default class UserProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		//Pegando o id do usuário *logado* na aplicação
		const user_id = request.user.id;

		const showUserProfile = new ShowUserProfileService();

		const user = await showUserProfile.execute({ user_id });

		return response.json(user);
	}

	public async update(
		request: Request,
		response: Response,
	): Promise<Response> {
		const user_id = request.user.id;
		const { name, email, password, old_password } = request.body;

		const updateUserProfile = new UpdateUserProfileService();

		const user = await updateUserProfile.execute({
			user_id: user_id,
			name: name,
			email: email,
			password: password,
			old_password: old_password,
		});

		return response.json(user);
	}
}
