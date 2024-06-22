import { Request, Response } from "express-serve-static-core";
import { createOneTransaction, createOneTransactionProduct, getAllTransaction, getAllTransactionProduct, getTotalTransaction, updateOneTransaction, updateOneTransactionProduct } from "../repositories/transactions";
import {  ItransactionQuery, ItransactionResponse } from "../models/transactions";
import getLink from "../helper/getLink";

//Create Transaction 
export const createNewTransaction = async (req: Request ,res: Response) => {
  try{
    const result = await createOneTransaction (req.body);
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

//Create Transaction product
export const createNewTransactionProduct = async (req: Request ,res: Response) => {
  const { id } = req.params
  try{
      const result = await createOneTransactionProduct(id , req.body);
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

//get all Transaction 
export const getTransaction = async (req: Request<{},{},{},ItransactionQuery> ,res: Response<ItransactionResponse>) => {
  try{
    const result = await getAllTransaction(req.query); 
    const dataTransaction = await getTotalTransaction();
    const page = parseInt((req.query.page as string) || "1");
    const totalData = parseInt(dataTransaction.rows[0].total_transaction);
    const totalPage = Math.ceil( totalData / (parseInt(req.query.limit || '3')));

    console.log(dataTransaction)
    const response = {
        msg: "success",
        data: result.rows,
        meta: {
            totalData,
            totalPage,
            page,
            prevLink: page > 1 ? getLink(req, "previous") : null,
            nextLink: page != totalPage ? getLink(req, "next") : null,
        }
    };

    // Mengirimkan respons JSON dengan status 200 OK ke klien
    return res.status(200).json(response);

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

//get all Transaction Product
export const getTransactionProduct = async (req: Request ,res: Response) => {
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

//update Transaction
export const updateTransaction = async (req: Request ,res: Response<ItransactionResponse>) => {
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
};

//update Transaction Product
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

