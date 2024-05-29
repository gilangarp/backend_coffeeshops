import { Request, Response } from "express-serve-static-core";
import { IstatusTransactionBody } from "../models/statusTransaction";
import { createOneTransactionProduct, getAllTransactionProduct, updateOneTransactionProduct } from "../repositories/transactionProduct";

export const createNewTransactionProduct = async (req: Request<IstatusTransactionBody> ,res: Response) => {
    try{
        const result = await createOneTransactionProduct(req.body);
        return res.status(201).json({
            msg: "success",
            data: result.rows,
        });
    }catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
          }
          return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
          });
        }  
  }

export const updateTransactionProduct = async (req: Request ,res: Response) => {
    const { id } = req.params
    try{
        const result = await updateOneTransactionProduct(id , req.body);
        return res.status(201).json({
            msg: "success",
            data: result.rows,
        });
    }catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
          }
          return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
          });
        }  
  }

export const getTransactionProduct = async (req: Request ,res: Response) => {
    const { id } = req.params;
    try{
        const result = await getAllTransactionProduct();
        return res.status(201).json({
            msg: "success",
            data: result.rows,
        });
    }catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
          }
          return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
          });
        }  
  };