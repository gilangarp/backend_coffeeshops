import { Router } from "express";
import { createImageProduct, getImageProduct, updateImageProduct } from "../handlers/imageProduct";

const imageProductRouter = Router();

imageProductRouter.post("/" , createImageProduct);
imageProductRouter.patch("/:id" , updateImageProduct);
imageProductRouter.get("/" , getImageProduct);

export default imageProductRouter