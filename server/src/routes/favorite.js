import { Router } from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites
} from "../controllers/product.js";

const routerFavorite = Router();

routerFavorite.post("/:id/add", addFavorite);
routerFavorite.delete("/:id/remove", removeFavorite);
routerFavorite.get("/", getFavorites);

export default routerFavorite;
