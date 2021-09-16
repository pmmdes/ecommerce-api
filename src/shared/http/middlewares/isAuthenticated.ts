import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface ITokenPayload {
	iat: number; //created at
	exp: number; //expires in
	sub: string; //conteudo
}

export default function isAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("JWT Token is missing.");
	}

	/* Bearer token
		[0]	[1]
	*/
	const [, token] = authHeader.split(" ");

	try {
		//se verify for true, retorna next(), se não, cai no catch.
		const decodedToken = verify(token, authConfig.jwt.secret);

		const { sub } = decodedToken as ITokenPayload;

		request.user = {
			id: sub,
		};

		return next();
	} catch {
		throw new AppError("Invalid JWT Token");
	}
}
