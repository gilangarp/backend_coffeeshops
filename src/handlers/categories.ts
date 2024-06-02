import { Request, Response } from "express-serve-static-core";
import { checkIfCategoryExists, createOneCategories, getAllCategories, updateOneCategories } from "../repositories/categories";

export const createNewCategories = async (req: Request, res: Response) => {
    try {
        const result = await createOneCategories(req.body);
        return res.status(200).json({
            msg: "success",
            data: result.rows,
        });
    } catch (err: unknown) {
        let errorMessage = "Internal Server Error";
        if (err instanceof Error) {
            errorMessage = err.message;
            if (errorMessage.includes('null value in column "categorie_name" of relation "categories" violates not-null constraint')) {
                errorMessage = "Category name cannot be null";
                return res.status(400).json({
                    msg: "Error",
                    err: errorMessage,
                });
            } else if (errorMessage.includes('duplicate key value violates unique constraint "categorie_name"')) {
                errorMessage = "Duplicate category name";
                return res.status(400).json({
                    msg: "Error",
                    err: errorMessage,
                });
            }
        }
        console.log(errorMessage);
        return res.status(500).json({
            msg: "Error",
            err: errorMessage,
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
    const  { id } = req.params;
    try{
        const categoryExists = await checkIfCategoryExists(id);
        console.log(categoryExists)
        if (!categoryExists) {
            return res.status(404).json({
                msg: "Category ID not found",
            });
        }
        const result = await updateOneCategories(id,req.body);
        console.log(result.rows)
        console.log(id)
        return res.status(200).json({
            msg: "succes",
            data: result.rows
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