import { Router } from "express";
import { createNewTransaction, getTransaction, updateTransaction } from "../handlers/transactions";

const transactionRouter = Router();

transactionRouter.post("/" , createNewTransaction);
transactionRouter.get("/" , getTransaction);
transactionRouter.patch("/" , updateTransaction);

export default transactionRouter