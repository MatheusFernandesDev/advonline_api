import { Sequelize, Model, DataTypes } from "sequelize";

class User extends Model {
  public id!: number;
  public uuid!: string;
  public name!: string;
  public email!: string;
  public id_user_type!: number;
  public token?: string;
  public password_hash!: string;
  public photo_filename?: string;

  public static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        id_user_type: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING,
        },
        password_hash: {
          type: DataTypes.STRING,
        },
        photo_filename: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }
}

export default User;
