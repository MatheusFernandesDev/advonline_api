import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "../../../services/GenerateToken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/core/user.model";

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
      const {
        name,
        email,
        id_user_type,
        password,
        ConfirmPassword,
        photo_filename,
      } = req.body;
      console.log(email);

      const uuid = uuidv4();

      const user = await User.findOne({ where: { email } });
      console.log(user);

      if (user) {
        return res
          .status(400)
          .json({ error: { email: { mgs: "Email já existe" } } });
      }
      let passwordHash;
      if (password && ConfirmPassword) {
        if (password !== ConfirmPassword) {
          return res.status(404).json({ msg: "Senhas não coincidem!" });
        }
        passwordHash = await bcrypt.hash(password, 10);
      }

      const newUser = await User.create({
        uuid: uuid,
        name,
        email,
        idUserType: id_user_type,
        passwordHash: passwordHash,
        photoFilename: photo_filename,
      });

      return res.status(201).json({ user: newUser });
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

      // const newUpdate = await user?.update({
      //   username,
      //   name,
      //   email,
      //   id_user_type,
      //   phone,
      //   photo_filename,
      // });
      // if (newUpdate) {
      //   return res.status(200).json(newUpdate);
      // }
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
