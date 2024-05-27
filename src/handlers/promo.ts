import { Request, Response } from "express";
import { createOnePromo, getAllPromo, updateOnePromo } from "../repositories/promo";
import { IpromoBody } from "../models/promo";


export const createNewPromo = async (req: Request<IpromoBody> ,res: Response) => {
  try{
      const result = await createOnePromo(req.body);
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