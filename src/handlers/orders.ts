import { Request, Response } from "express-serve-static-core";
import { createOrder, deleteOneOrder, getAllOrders, updateOneOrders } from "../repositories/orders";
import { IordersBody, IordersQuery } from "../models/orders";

export const getOrders = async (req: Request<{},{},{},IordersQuery>, res: Response) => {
    try{
        const result = await getAllOrders(req.query);
        return res.status(200).json({
            msg: "succes",
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

export const createNewOrders = async (req: Request<IordersBody>, res: Response) => {
    try{
        const result = await createOrder(req.body)
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

export const updateOrders = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await updateOneOrders(id, req.body);
        return res.status(200).json({
            msg: "success",
            data: result.rows,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
        });
    }
};


export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await deleteOneOrder(id);
        return res.status(200).json({
            msg: "succes",
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