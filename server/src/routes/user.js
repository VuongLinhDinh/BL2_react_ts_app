import { Router } from "express";
import { getUserById, getUsers } from "../controllers/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const routerUser = Router();

routerUser.use(checkAuth, checkIsAdmin);
routerUser.get("/", getUsers);
routerUser.get("/:id", getUserById);

export default routerUser;
