import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../app/models/core/user.model";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do Sequelize
const connection = new Sequelize({
  dialect: process.env.DB_DIALECT_CORE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT_CORE),
  username: process.env.DB_USER_CORE,
  password: process.env.DB_PASSWORD_CORE,
  database: process.env.DB_DATABASE_CORE,
  logging: false,
  models: [User],
});

async function connectionDB() {
  try {
    await connection.sync();
  } catch (error) {
    console.log(error);
  }
}

export default connectionDB;
