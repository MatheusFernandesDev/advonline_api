const { resolve } = require("path");

module.exports = {
  config: resolve(__dirname, "..", "connection", "connection.ts"),
  "models-path": resolve(__dirname, "..", "app", "models", "core"),
  "migrations-path": resolve(__dirname, "migrations", "core"),
  "seeders-path": resolve(__dirname, "seed", "core"),
};
