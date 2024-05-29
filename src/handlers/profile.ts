import { Request, Response } from "express-serve-static-core";
import { createOneProfile, getAllProfile, updateOneProfile } from "../repositories/profile";

export const createNewProfile = async (req: Request, res: Response) => {
    try{
        const result = await createOneProfile(req.body);
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

export const getProfile = async (req: Request, res: Response) => {
    try{
        const result = await getAllProfile();
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

export const updateProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await updateOneProfile(id,req.body);
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