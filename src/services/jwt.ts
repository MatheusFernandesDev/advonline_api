import dotenv from "dotenv";

dotenv.config();

export default {
  secret: process.env.SECRET_KEY || "default_secret",
  expires: {
    expiresIn: "7h",
  },
};
