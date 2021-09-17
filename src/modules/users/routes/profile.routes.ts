import { Router } from "express";
import UserProfileController from "../controllers/UserProfileController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const profileRouter = Router();
const profileController = new UserProfileController();

//Aplicando o middleware em todas as rotas
profileRouter.use(isAuthenticated);

profileRouter.get("/", profileController.show);

profileRouter.put(
	"/",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().optional(),
			password_confirmation: Joi.string()
				.valid(Joi.ref("password"))
				.when("password", {
					is: Joi.exist(),
					then: Joi.required(),
				}),
			old_password: Joi.string(),
		},
	}),
	profileController.update,
);

export default profileRouter;
