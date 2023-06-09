import express, { Request, Response, Router } from "express";

// CONTROLLERS //
import UserController from "./app/controllers/core/UserController";

//VALIDATORS
// import UserValidator from "./validators/core/UserValidator.js";

const routes: Router = express.Router();

// routes.use(isAuthenticated)

// USERS //
routes.get("/users", UserController.getList);
routes.get("/user/:id", UserController.getUser);
routes.post("/user", UserController.insert);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);
routes.get("/profile", UserController.getProfile);

routes.use("*", (req: Request, res: Response) => {
  return res.status(404).send("route not found");
});

export default routes;
