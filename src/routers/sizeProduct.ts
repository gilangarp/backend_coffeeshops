import { Router } from "express";
import { createNewSizeProduct, getSizeProduct, updateSizeProduct } from "../handlers/sizeProduct";

const sizeProductRouter = Router();

sizeProductRouter.post("/" , createNewSizeProduct);
sizeProductRouter.get("/" , getSizeProduct);
sizeProductRouter.patch("/:id" , updateSizeProduct);

export default sizeProductRouter