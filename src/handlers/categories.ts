import { Request, Response } from "express";
import { createOneCategories, getAllCategories, updateOneCategories } from "../repositories/categories";

export const createNewCategories = async (req: Request, res: Response) => {
    try{
        const result = await createOneCategories(req.body);
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

export const getCategories = async (req: Request, res: Response) => {
    try{
        const result = await getAllCategories();
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

export const updateCategories = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await updateOneCategories(id,req.body);
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