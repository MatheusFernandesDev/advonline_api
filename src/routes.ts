import express, { Request, Response, Router } from "express";
import AuthController from "./app/controllers/core/auth.controller";

const routes: Router = express.Router();

routes.get("/", (req: Request, res: Response) => {
  res.status(200).send("running...");
});

routes.post("/auth", AuthController.autheticate);

export default routes;
