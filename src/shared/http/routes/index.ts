import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import customerRouter from "@modules/customers/routes/customers.routes";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);

routes.use("/users", usersRouter);

routes.use("/sessions", sessionsRouter);

routes.use("/password", passwordRouter);

routes.use("/profile", profileRouter);

routes.use("/customers", customerRouter);

export default routes;
