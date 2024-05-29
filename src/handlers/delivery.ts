import { Request, Response } from "express-serve-static-core";
import { IdeliveryBody } from "../models/delivery";
import { createOneDelivery, getAllDelivery, updateOneDelivery } from "../repositories/delivery";

export const createNewDelivery = async (req: Request <IdeliveryBody>, res: Response) => {
    try{
        const result = await createOneDelivery(req.body);
        if (!result) {
            return res.status(404).json({
                msg: "Error",
                err: "Data Not Found",
            });
        }
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

export const getDelivery = async (req: Request ,res: Response) => {
    const { id } = req.params;
    try {
      const result = await getAllDelivery();
      return res.status(200).json({
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

export const updateDelivery = async (req: Request ,res: Response) => {
    const { id } = req.params;
    try{
        const result = await updateOneDelivery(id,req.body);
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