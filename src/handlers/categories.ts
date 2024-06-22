import { Request, Response } from "express-serve-static-core";
import { checkIfCategoryExists, createOneCategories, getAllCategories, updateOneCategories } from "../repositories/categories";
import { IcategoriesResponse } from "../models/categories";

export const createNewCategories = async (req: Request, res: Response<IcategoriesResponse>) => {
    try {
        const result = await createOneCategories(req.body);
        return res.status(200).json({
            msg: "success",
            data: result.rows,
        });
    } catch (err) {
        let errorMessage = "Internal Server Error";
        if (err instanceof Error) {
            errorMessage = err.message;
            if (errorMessage.includes('null value in column "categorie_name" of relation "categories" violates not-null constraint')) {
                errorMessage = "Category name cannot be null";
                return res.status(400).json({
                    msg: "Error",
                    err: errorMessage,
                });
            } 
            if (errorMessage.includes('duplicate key value violates unique constraint "unique_categorie_name"')) {
                errorMessage = "Categorie name already exists";
                return res.status(400).json({
                    msg: "Error",
                    err: errorMessage,
                });
            }
            if (errorMessage.includes('duplicate key value violates unique constraint "unique_delivery_method"')) {
                errorMessage = "Categorie name are the same, no need to change";
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

export const getCategories = async (req: Request, res: Response<IcategoriesResponse>) => {
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

export const updateCategories = async (req: Request, res: Response<IcategoriesResponse>) => {
    const  { id } = req.params;
    try{
        const categoryExists = await checkIfCategoryExists(id);
        if (!categoryExists) {
            return res.status(404).json({
                msg: "Category ID not found",
            });
        }
        const result = await updateOneCategories(id,req.body);
        return res.status(200).json({
            msg: "succes",
            data: result.rows
        });
    }catch (err: unknown) {
        let errorMessage = "Internal Server Error";
        if (err instanceof Error) {
            errorMessage = err.message;
            if (errorMessage.includes('null value in column "categorie_name" of relation "categories" violates not-null constraint')) {
                errorMessage = "Category name cannot be null";
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
}