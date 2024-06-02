import { Router } from "express";
import { createNewProduct, getProduct, updateProduct } from '../handlers/products';
import { singleUpdloader } from "../middleware/upload";

const productRouter = Router();

productRouter.get("/" , getProduct);

productRouter.post("/" , singleUpdloader("productimg"), createNewProduct);

productRouter.patch("/:id",singleUpdloader("productimg"), updateProduct);

export default productRouter; 