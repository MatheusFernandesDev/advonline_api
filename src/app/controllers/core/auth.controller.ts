import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "../../../services/GenerateToken";
import { User } from "../../models/core/user.model";

class AuthController {
  async autheticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ msg: "Erro na autenticacao" });
      }

      const bcreturn = await bcrypt.compare(password, user.passwordHash);
      console.log(bcreturn);

      if (!bcreturn) {
        console.log("entrei aqui");
        return res.status(400).json({ msg: "Erro na autenticacao" });
      }

      const token = generateToken({
        uuid: user.uuid,
        type: user.idUserType,
      });

      user.token = token;
      await user.save();

      return res.status(200).json({
        msg: "Usuário autenticado com sucesso.",
        token,
        name: user.name,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }
}

export default new AuthController();
