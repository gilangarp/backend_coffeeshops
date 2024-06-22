import { Router } from "express";
import { createNewProduct, getDetailProduct, getProduct, updateProduct } from '../handlers/products';
import { singleCloudUploader } from "../middleware/upload";

const productRouter = Router();

productRouter.get("/" , getProduct);

productRouter.post("/" , singleCloudUploader("productimg"), createNewProduct);

productRouter.patch("/:id",singleCloudUploader("productimg"), updateProduct);

productRouter.get("/:id" , getDetailProduct);


export default productRouter; 