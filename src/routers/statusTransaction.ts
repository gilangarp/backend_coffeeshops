import { Router } from "express";
import { createNewStatusTransaction, getStatusTransaction, upgradeStatusTransaction } from "../handlers/statusTransaction";

const statusTransactionRouter = Router();

statusTransactionRouter.post("/" , createNewStatusTransaction);
statusTransactionRouter.get("/" , getStatusTransaction);
statusTransactionRouter.patch("/:id" , upgradeStatusTransaction);

export default statusTransactionRouter