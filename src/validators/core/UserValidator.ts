import { checkSchema, Schema } from "express-validator";
import { User } from "../../app/models/core/user.model";
import { Request } from "express";

// import UserType from '../../app/models/core/UserType';
// import ValidaCNPJ from '../../services/ValidaCNPJ';
// import ValidaCPF from "../../services/ValidaCPF"

const userSchema: Schema = {
  name: {
    notEmpty: {
      bail: true,
    },
    isString: true,
    errorMessage: "Insira um nome válido",
  },
  email: {
    isEmail: {
      bail: true,
    },
    errorMessage: "Insira um e-mail válido",
    custom: {
      options: async (req: Request) => {
        if ((await User.findOne({ where: { email: req } })) != null) {
          return Promise.reject(new Error("Esse email já está cadastrado"));
        }
        return true;
      },
    },
  },
};
export default checkSchema(userSchema);

// export default checkSchema({
//   // email: {
//   //   isEmail: {
//   //     bail: true,
//   //   },
//   //   errorMessage: "Insira um e-mail válido",
//   //   custom: {
//   //     options: async (value) => {
//   //       if ((await User.findOne({ where: { email: value } })) != null) {
//   //         return Promise.reject(new Error("Esse email não está disponível"));
//   //       }
//   //       return true;
//   //     },
//   //   },
//   // },
//   name: {
//     notEmpty: {
//       bail: true,
//     },
//     isString: true,
//     errorMessage: "Insira um nome válido",
//   },
//   // password: {
//   //   notEmpty: {
//   //     bail: true,
//   //   },
//   //   errorMessage: "Insira uma senha válida.",
//   //   isString: true,
//   //   isLength: {
//   //     options: [{ min: 8, max: 16 }],
//   //     errorMessage: "Digite uma senha que contenha entre 8 e 16 caracteres",
//   //   },
//   //   matches: {
//   //     options: [
//   //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
//   //       "g",
//   //     ],
//   //     errorMessage:
//   //       "Digite uma senha que contenha letras, números e caracteres especiais ",
//   //   },
//   // },
//   // confirmPassword: {
//   //   notEmpty: {
//   //     bail: true,
//   //   },
//   //   isString: true,
//   //   errorMessage: "Insira uma senha válida.",
//   //   custom: {
//   //     options: (value, { req }) => {
//   //       if (value !== req.body.password) {
//   //         return Promise.reject(new Error("As senhas não coincidem"));
//   //       }
//   //       return true;
//   //     },
//   //   },
//   // },
//   // cpf_cnpj: {
//   //   notEmpty: {
//   //     bail: true,
//   //   },
//   //   isString: {
//   //     bail: true,
//   //   },
//   //   errorMessage: "CPF/CNPJ inválido",
//   //   custom: {
//   //     options: async (value, { req }) => {
//   //       if (req.body.userType === "1") {
//   //         if ((await User.findOne({ where: { cpf_cnpj: value } })) !== null) {
//   //           return Promise.reject(new Error("Esse CPF já está cadastrado"));
//   //         }
//   //         if (value !== "") {
//   //           if (ValidaCPF(value) == false) {
//   //             return Promise.reject(new Error("CPF não existe ou inválido"));
//   //           }
//   //           return true;
//   //         }
//   //       }
//   //       if (req.body.userType === "2") {
//   //         if ((await User.findOne({ where: { cpf_cnpj: value } })) !== null) {
//   //           return Promise.reject(new Error("Esse CNPJ já está cadastrado"));
//   //         }
//   //         if (value !== "") {
//   //           if (ValidaCNPJ(value) == false) {
//   //             return Promise.reject(new Error("CNPJ não existe ou inválido"));
//   //           }
//   //           return true;
//   //         }
//   //       }
//   //     },
//   //   },
//   // },
//   // id_user_type: {
//   //   isInt: true,
//   //   toInt: true,
//   //   errorMessage: "Escolha um tipo válido",
//   //   custom: {
//   //     options: async (value) => {
//   //       const user_type_id = await UserType.findOne({ where: { id: value } });
//   //       if (!user_type_id) {
//   //         return Promise.reject(new Error("Escolha um tipo válido"));
//   //       }
//   //       return true;
//   //     },
//   //   },
//   // },
// });
