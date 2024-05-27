import { Router } from "express";
import { createNewPaymentMethod, getPaymentMethod, updatePaymentMethod } from "../handlers/paymentMethod";

const paymentMethodRouter = Router();

paymentMethodRouter.post("/" , createNewPaymentMethod);
paymentMethodRouter.get("/" , getPaymentMethod);
paymentMethodRouter.patch("/:id" , updatePaymentMethod);

export default paymentMethodRouter