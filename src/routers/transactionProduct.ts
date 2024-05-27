import { Router } from 'express';
import { createNewTransactionProduct, getTransactionProduct, updateTransactionProduct } from '../handlers/transactionProduct';

const transactionProductRouter = Router();

transactionProductRouter.post("/" , createNewTransactionProduct);
transactionProductRouter.patch("/:id" , updateTransactionProduct);
transactionProductRouter.get("/" , getTransactionProduct);

export default transactionProductRouter