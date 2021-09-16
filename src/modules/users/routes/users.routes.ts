import { Router } from "express";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import uploadConfig from "@config/upload";
import multer from "multer";

const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRoutes.get("/", isAuthenticated, usersController.index);

usersRoutes.post(
	"/",
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create,
);

usersRoutes.delete(
	"/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	usersController.delete,
);

usersRoutes.patch(
	"/avatar",
	isAuthenticated,
	upload.single("avatar"), //único arquivo
	userAvatarController.update,
);
export default usersRoutes;
