import { Router } from "express";
import { createNewProduct, getProduct, updateProduct } from '../handlers/products';

const productRouter = Router();

productRouter.get("/" , getProduct);

productRouter.post("/" , createNewProduct);

productRouter.patch("/:id", updateProduct);

//productRouter.delete("/:id", deleteProduct);

export default productRouter; 