import { Request, Response } from "express-serve-static-core";
import { checkIfPromoExists, createNewImagePromo, createOnePromo, getAllPromo, updateOnePromo } from "../repositories/promo";
import { IpromoBody } from "../models/promo";
import db from "../configs/pg";
import { cloudinaryUploader } from "../helper/cloudinary";

export const createNewPromo = async (req: Request<{},{},IpromoBody>, res: Response) => {
    try {
      const client = await db.connect();
      try {
        await client.query("BEGIN")
        const promo = await createOnePromo(req.body);
        if (!promo) {
          return res.status(404).json({
              msg: "Error",
              err: "Data Not Found",
          });
      };
      const promoIds = promo.rows[0].id;
      if (!promoIds) throw new Error("Id product tidak ditemukan");
      const { result, error } = await cloudinaryUploader(req, "promoimg", promoIds);
      if (error) throw error;
      if (!result) throw new Error("Upload gagal");
      const imgPromo = await createNewImagePromo(client,promoIds,result.secure_url);
      await client.query("COMMIT");
      return res.status(201).json({
        msg: "Success",
        data: [promo.rows, imgPromo.rows]
      })
      } catch(error){
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    } catch (err: unknown) {
          if (err instanceof Error) {
              if (err.message.includes('duplicate key value violates unique constraint "product_name"')) {
                  return res.status(400).json({
                      msg: "Error",
                      err: "Product name already exists",
                  });
              }
            if (err.message.includes('File not found')) {
              return res.status(400).json({
                  msg: "Error",
                  err: "Productimg cannot be null",
              });
          } 
            return res.status(500).json({
                msg: "Error",
                err: "Internal Server Error",
            });
        }
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

export const updatePromo = async (req: Request, res: Response) => {
  try {
    const client = await db.connect();
    const { file, params: { id }, body } = req;
    try {
      await client.query("BEGIN");
      
      // Jika hanya promoo body yang terisi
      if (Object.keys(body).length > 0) {
        const product = await updateOnePromo(id, req.body);
        return res.status(201).json({
          msg: "Success",
          data: product.rows
        });
      }
      
      // Jika hanya img promo yang terisi
      if (file) {
      const { result, error } = await cloudinaryUploader(req, "productimg", id as string);
      if (error) throw error;
      if (!result) throw new Error("Upload gagal")
      const imgProduct = await updateOnePromo(id,body, result.secure_url);
          return res.status(201).json({
            msg: "Success",
            data: imgProduct.rows
          });
      }
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (err: unknown) {
    let errorMessage = "Internal Server Error";
      if (err instanceof Error) {
          errorMessage = err.message;
          if (errorMessage.includes('duplicate key value violates unique constraint "product_name"')) {
              errorMessage = "Product name already exists";
              return res.status(400).json({
                  msg: "Error",
                  err: errorMessage,
              });
          }if (errorMessage.includes('null value in column "product_name" of relation "categories" violates not-null constraint')) {
            errorMessage = "Product name cannot be null";
            return res.status(400).json({
                msg: "Error",
                err: errorMessage,
            });
        } 
      return res.status(500).json({
        msg: "Error",
        err: "Internal Server Error",
      });
    }
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