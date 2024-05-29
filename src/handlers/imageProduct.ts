import { Request, Response } from "express-serve-static-core";
import { createNewImageProduct, getAllImageProduct, updateOneImageProduct } from "../repositories/imageProduct";

export const createImageProduct = async (req: Request, res: Response) => {
    try{
        const result = await createNewImageProduct(req.body);
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

export const updateImageProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await updateOneImageProduct(id, req.body);
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
}

export const getImageProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await getAllImageProduct();
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
}