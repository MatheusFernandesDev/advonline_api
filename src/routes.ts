import express, { Request, Response, Router } from "express";

const routes: Router = express.Router();

routes.get("/", (req: Request, res: Response) => {
  res.status(200).send("running...");
});

export default routes;
