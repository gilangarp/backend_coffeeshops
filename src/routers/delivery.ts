import { Router } from "express";
import { createNewDelivery, getDelivery, updateDelivery } from "../handlers/delivery";

const deliveryRouter = Router();

deliveryRouter.post("/" , createNewDelivery);
deliveryRouter.get("/" , getDelivery);
deliveryRouter.patch("/:id" , updateDelivery )

export default deliveryRouter