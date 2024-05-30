import { Router } from "express";
import { createImageProduct, getImageProduct, updateImageProduct } from "../handlers/imageProduct";
import { singleUploader } from "../middleware/upload";

const imageProductRouter = Router();

imageProductRouter.post("/" , createImageProduct);
imageProductRouter.patch("/:id" , singleUploader("product") , updateImageProduct);
imageProductRouter.get("/" , getImageProduct);

export default imageProductRouter