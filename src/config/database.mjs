/* eslint-disable no-underscore-dangle */
import dotenv from "dotenv";

dotenv.config();

const advonline_core = {
  dialect: process.env.DB_DIALECT_CORE,
  host: process.env.DB_HOST_CORE,
  username: process.env.DB_USER_CORE,
  port: process.env.DB_PORT_CORE,
  password: process.env.DB_PASS_CORE,
  database: process.env.DB_DATABASE_CORE,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
  logging: false,
};

export default advonline_core;
