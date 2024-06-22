import { Router } from "express";
import { createNewTransaction, createNewTransactionProduct, getTransaction, getTransactionProduct, updateTransaction, updateTransactionProduct } from "../handlers/transactions";

const transactionRouter = Router();

transactionRouter.post("/" , createNewTransaction);
transactionRouter.get("/" , getTransaction);
transactionRouter.patch("/:id" , updateTransaction);

transactionRouter.post("/tp/:id" , createNewTransactionProduct);
transactionRouter.get("/tp" , getTransactionProduct);
transactionRouter.patch("/tp/:id" , updateTransactionProduct);

export default transactionRouter