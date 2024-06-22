import { Router } from "express";
import productRouter from "./products";
import promoRouter from "./promo";
import usersRouter from "./users";
import categoriesRouter from "./categories";
import sizeProductRouter from "./sizeProduct";
import statusTransactionRouter from "./statusTransaction";
import deliveryRouter from "./delivery";
import paymentMethodRouter from "./paymentMethod";
import profileRouter from "./profile";
import transactionRouter from "./transactions";

const mainRouter = Router();

mainRouter.use("/user", usersRouter);
mainRouter.use("/promo", promoRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/profile" , profileRouter);
mainRouter.use("/delivery" , deliveryRouter);
mainRouter.use("/categorie", categoriesRouter);
mainRouter.use("/sizeproduct" , sizeProductRouter);
mainRouter.use("/transaction" , transactionRouter);
mainRouter.use("/paymentmethod" , paymentMethodRouter);
mainRouter.use("/statustransaction" , statusTransactionRouter);

export default mainRouter;