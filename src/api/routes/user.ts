import { Router } from "express";
import { celebrate as validate, Joi } from "celebrate";

import UserController from "../controllers/user";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.post(
    "/",
    validate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    UserController.createUser
  );

  route.get("/:id", UserController.getUserById);
  route.put("/:id", UserController.updateUser);
  route.delete("/:id", UserController.deleteUser);

  route.post("/login", UserController.login);

  app.use("/users", route); /* api/users */

  route.get("/", UserController.list);
};
