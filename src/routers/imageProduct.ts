import { Router } from "express";
import { createImageProduct, getImageProduct, updateImageProduct } from "../handlers/imageProduct";
import { singleUpdloader } from "../middleware/upload";

const imageProductRouter = Router();
imageProductRouter.post("/imgproduct/:id" , singleUpdloader("imgproduct") , createImageProduct);
imageProductRouter.patch("/imgproduct/:id" , singleUpdloader("product") , updateImageProduct);
imageProductRouter.get("/" , getImageProduct);

export default imageProductRouter