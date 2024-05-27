import { Request, Response } from "express";
import { createOnePaymentMethod, getAllPaymentMethod, updateOnePaymentMethod } from "../repositories/paymentMethod";

export const createNewPaymentMethod = async (req: Request, res: Response) => {
    try{
        const result = await createOnePaymentMethod(req.body);
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

export const getPaymentMethod = async (req: Request, res: Response) => {
    try{
        const result = await getAllPaymentMethod();
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

export const updatePaymentMethod = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await updateOnePaymentMethod(id,req.body);
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
