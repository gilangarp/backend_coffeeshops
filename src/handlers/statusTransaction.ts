import { Request, Response } from "express-serve-static-core";
import { createOneStatusTransaction, getAllStatusTransaction, upgradeOneStatusTransaction } from "../repositories/statusTransaction";
import { IstatusTransactionBody } from "../models/statusTransaction";

export const createNewStatusTransaction = async (req: Request<IstatusTransactionBody> ,res: Response) => {
    try{
        const result = await createOneStatusTransaction(req.body);
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

export const getStatusTransaction = async (req: Request ,res: Response) => {
    try{
        const result = await getAllStatusTransaction();
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

export const upgradeStatusTransaction = async (req: Request ,res: Response) => {
    const { id } = req.params
    try{
        const result = await upgradeOneStatusTransaction(id , req.body);
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
  