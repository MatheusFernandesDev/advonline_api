import jsonwebtoken from "jsonwebtoken";
import jwt from "./jwt";

function generateToken(params = {}) {
  const token = jsonwebtoken.sign({ params }, jwt.secret, jwt.expires);
  return token;
}

export default generateToken;
