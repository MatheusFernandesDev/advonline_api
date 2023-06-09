import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "../../../services/GenerateToken";
import { v4 as uuidv4 } from "uuid";
import User from "../../models/core/User";

class UserController {
  async getList(req: Request, res: Response) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (err) {
      if (
        err instanceof TypeError &&
        err.message.includes("Cannot convert undefined or null to object")
      ) {
        return res.status(200).json([]);
      }
      return res.status(400).json({ msg: `Erro ao listar usuários ${err}` });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ msg: `Error ao listar usuários ${err}` });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await User.findOne({ where: { id: 1 } });

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ msg: `Error ao listar usuários ${err}` });
    }
  }

  async insert(req: Request, res: Response) {
    try {
      const { name, email, id_user_type, password, photo_filename } = req.body;

      const uuid = uuidv4();

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        uuid: uuid,
        name,
        email,
        id_user_type,
        password_hash: hashedPassword,
        photo_filename,
      });

      const token = generateToken({ id: newUser.id });

      return res.status(201).json({ user: newUser, token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, name, email, id_user_type, phone, photo_filename } =
      req.body;
    try {
      const user = await User.findOne({ where: { id: Number(id) } });

      const newUpdate = await user?.update({
        username,
        name,
        email,
        id_user_type,
        phone,
        photo_filename,
      });
      if (newUpdate) {
        return res.status(200).json(newUpdate);
      }
    } catch (err) {
      return res.status(400).json({ error: "Error updating user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userDelete = User.destroy({ where: { id: Number(id) } });

      if (userDelete) {
        return res.status(200).json(userDelete);
      }
    } catch (err) {
      return res.status(400).json({ error: "Error deleting user" });
    }
  }
}

export default new UserController();
