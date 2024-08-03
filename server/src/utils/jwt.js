import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
// const { JWT_SECRET } = process.env;

export const verifyToken = (token) => {
  return jwt.verify(token, "mykey");
};

export const generateToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, "mykey", {
    expiresIn: expiresIn
  });
};
