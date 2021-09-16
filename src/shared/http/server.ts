import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"; //essencial para a classe AppError funcionar
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";
import { errors } from "celebrate";
import uploadConfig from "@config/upload";

const app = express();

//qualquer domínio pode usar a api
app.use(cors());

//explicitar que trabalharemos com json
app.use(express.json());

//Rota estática para mostrar imagens (files/imgName)
app.use("/files", express.static(uploadConfig.directory));

app.use(routes);

//habilitando tratamento de erros do celebrate
app.use(errors());

//tratamento de erros personalizado
app.use(
	(
		error: Error,
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		if (error instanceof AppError) {
			return response.status(error.statusCode).json({
				status: "error",
				message: error.message,
			});
		}

		return response.status(500).json({
			status: "error",
			message: "Internal server error :(",
		});
	},
);

app.listen(3333, () => {
	console.log("Server started on port 3333!");
});
