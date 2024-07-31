import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "../validSchema/auth.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { updateProfile } from "../controllers/updateProfile.js";

const routerAuth = Router();
routerAuth.post("/register", validBodyRequest(registerSchema), register);
routerAuth.post("/login", validBodyRequest(loginSchema), login);
routerAuth.post("/forgot-password", forgotPassword);
routerAuth.get("/me", checkAuth, getProfile);
routerAuth.patch("/me", checkAuth, updateProfile);

export default routerAuth;
