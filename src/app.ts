import "dotenv/config";
import express from "express";
import path from "path";
// import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes";
import authenticated_routes from "./authenticated_routes";
// import FileRoutes from "./FileRoutes";
// import "./database/core";
import connectionDB from "./connection/connection";

connectionDB();
class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    // this.cron();
  }

  private middlewares(): void {
    this.server.use("trust proxy", (ip: string) => {
      if (ip === "127.0.0.1" || ip === "192.168.0.10") return 1;
      return 0;
    });
    // this.server.use("/public", express.static(path.join(__dirname, "public")));
    // this.server.use(cookieParser());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(
      cors({
        origin: process.env.BASE_URL_FRONT,
        credentials: true,
      })
    );
  }

  private routes(): void {
    this.server.use(routes);
    this.server.use(authenticated_routes);
    // this.server.use(FileRoutes);
  }
}

export default new App().server;
