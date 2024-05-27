import { Router } from "express";
import { createNewCategories, getCategories, updateCategories } from "../handlers/categories";

const categoriesRouter = Router();

categoriesRouter.get("/" , getCategories);
categoriesRouter.post("/" , createNewCategories);
categoriesRouter.patch("/:id" , updateCategories);

export default categoriesRouter
