import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
	public async update(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { token, password } = request.body;

		const resetPassword = new ResetPasswordService();

		await resetPassword.execute({
			token: token,
			password: password,
		});

		return response.status(204).json();
	}
}
