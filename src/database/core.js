import Sequelize from "sequelize";
import advonline_core from "../config/database.mjs";
import User from "../app/models/core/User.ts";

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(advonline_core);

    models.map((model) => model.init(this.connection));

    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();

export const connection = new Sequelize(advonline_core);
