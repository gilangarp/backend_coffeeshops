import { Request, Response } from "express-serve-static-core";
import { IstatusTransactionBody } from "../models/statusTransaction";
import { createOneTransaction, getAllTransaction, updateOneTransaction } from "../repositories/transactions";

export const createNewTransaction = async (req: Request<IstatusTransactionBody> ,res: Response) => {
    try{
        const result = await createOneTransaction(req.body);
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

export const getTransaction = async (req: Request ,res: Response) => {
    try{
        const result = await getAllTransaction();
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

export const updateTransaction = async (req: Request ,res: Response) => {
    const { id } = req.params
    try{
        const result = await updateOneTransaction (id , req.body);
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
  