import { Request, Response } from "express-serve-static-core";
import { checkIfPromoExists, createOnePromo, getAllPromo, updateOnePromo } from "../repositories/promo";
import { IpromoBody } from "../models/promo";


export const createNewPromo = async (req: Request<IpromoBody> ,res: Response) => {
  try{
      const result = await createOnePromo(req.body);
      return res.status(201).json({
          msg: "success",
          data: result.rows,
      });
  }catch (err: unknown) {
      let errorMessage = "Internal Server Error";
      if (err instanceof Error) {
          errorMessage = err.message;
          if (errorMessage.includes('null value in column "discount_price" of relation "promo" violates not-null constraint')) {
              errorMessage = "Discount price cannot be null";
              return res.status(400).json({
                  msg: "Error",
                  err: errorMessage,
              });
          } else if (errorMessage.includes('null value in column "product_id" of relation "promo" violates not-null constraint')) {
              errorMessage = "Product Id cannot be null";
              return res.status(400).json({
                  msg: "Error",
                  err: errorMessage,
              });
          }
      }
      return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
      });
    }  
}

export const getPromo = async (req: Request ,res: Response) => {
  try{
      const result = await getAllPromo();
      return res.status(200).json({
          msg: "success",
          data: result.rows,
      })
  }catch (err: unknown){
      if (err instanceof Error) {
          console.log(err.message);
        }
        return res.status(500).json({
          msg: "Error",
          err: "Internal Server Error",
        });
  }
};

export const updatePromo = async (req: Request ,res: Response) => {
  const { id } = req.params;
  try{
      const categoryExists = await checkIfPromoExists(id);
      console.log(categoryExists)
      if (!categoryExists) {
          return res.status(404).json({
              msg: "ID promo tidak ditemukan",
          });
      }
      const result = await updateOnePromo(id,req.body);
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


/* 
export const deletePromo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
      const result = await deleteOnePromo(id);
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

 */