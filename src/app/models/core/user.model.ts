import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.STRING,
    allowNull: false,
  })
  id!: number;
  @Column({ type: DataType.UUID, allowNull: false, unique: true })
  uuid!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.NUMBER, field: "id_user_type", allowNull: false })
  idUserType!: number;

  @Column({ type: DataType.STRING })
  token!: string;

  @Column({ type: DataType.STRING, field: "password_hash", allowNull: false })
  passwordHash!: string;

  @Column({ type: DataType.STRING, field: "photo_filename" })
  photoFilename!: string;
    id_user_type: any;
}
