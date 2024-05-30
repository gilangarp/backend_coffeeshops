import { Request, Response } from "express-serve-static-core";
import { createNewImageProduct, getAllImageProduct, updateOneImageProduct } from "../repositories/imageProduct";
import { IdataImageProductResponse } from "../models/imageProduct";

/* export const createImageProduct = async (req: Request, res: Response) => {
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
} */


export const createImageProduct = async (req: Request<{ nis: string }>, res: Response<IdataImageProductResponse>) => {
    const {file} = req;
    if (!file)
      return res.status(400).json({
        msg: "File not found",
        err: "Only receive input for image files (JPG, PNG, JPEG)",
      });
    try {
      const result = await createNewImageProduct(req.body);
      return res.status(200).json({
        msg: "Gambar berhasil ditambahkan",
        data: result.rows,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (/(invalid(.)+id(.)+)/g.test(error.message)) {
          return res.status(401).json({
            msg: "Error",
            err: "Product tidak ditemukan",
          });
        }
        console.log(error.message);
      }
      return res.status(500).json({
        msg: "Error",
        err: "Internal Server Error",
      });
    }
  };

/* export const updateImageProduct = async (req: Request, res: Response) => {
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
} */

export const updateImageProduct = async (req: Request<{ id: string }>, res: Response<IdataImageProductResponse>) => {
  const {file,params: { id },} = req;
  if (!file)
    return res.status(400).json({
      msg: "File not found",
      err: "Only receive input for image files (JPG, PNG, JPEG)",
    });
  try {
    const result = await updateOneImageProduct(id, file.filename);
    return res.status(200).json({
      msg: "Gambar berhasil ditambahkan",
      data: result.rows,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(error.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "Product tidak ditemukan",
        });
      }
      console.log(error.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};


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