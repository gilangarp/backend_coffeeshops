import { Request, Response } from "express-serve-static-core";
import { IsizeProductBody } from "../models/sizeProduct";
import { createOneSizeProduct, getAllSizeProduct, updateOneSizeProduct } from "../repositories/sizeProduct";

export const createNewSizeProduct = async (req: Request <IsizeProductBody> ,res: Response) => {
    try{
        const result = await createOneSizeProduct(req.body);
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
  
export const getSizeProduct = async (req: Request <IsizeProductBody> ,res: Response) => {
  try{
      const result = await getAllSizeProduct();
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

export const updateSizeProduct = async (req: Request ,res: Response) => {
  const { id } = req.params
  try{
      const result = await updateOneSizeProduct( id, req.body );
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