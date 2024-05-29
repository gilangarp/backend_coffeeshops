import { Request, Response } from "express-serve-static-core";
import { createNewOrderDetails, deleteOneOrderDetail, getAllOrdersDetails, updateOneOrderDetails } from "../repositories/orderDetails"
import { IorderDetailsBody } from "../models/orderDetails";

export const getOrdersDetails = async (req: Request, res: Response) => {
    try{
        const result = await getAllOrdersDetails();
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
}

export const createOrderDetails = async (req: Request <IorderDetailsBody>, res: Response) => {
    try{
        const result = await createNewOrderDetails(req.body)
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

export const updateOrderDetails = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await updateOneOrderDetails(id, req.body);
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


export const deleteOrderDetails = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await deleteOneOrderDetail(id);
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