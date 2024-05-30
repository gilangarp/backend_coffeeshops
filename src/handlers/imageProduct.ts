import { Request, Response } from "express";
import { createNewImageProduct, getAllImageProduct, updateOneImageProduct } from "../repositories/imageProduct";

export const updateImageProduct = async (req: Request<{id: string}>, res: Response ) =>{
    try {
        const { file } = req;
        const { id } = req.params
        const result = await updateOneImageProduct( id, file?.filename);
        return res.status(200).json({
            msg: "Gambar berhasil update",
            data: result.rows,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (/(invalid(.)+id(.)+)/g.test(error.message)) {
          return res.status(401).json({
            msg: "Error",
            err: "User tidak ditemukan",
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

export const createImageProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { file } = req;
    const { id } = req.params;

    if (!file) {
      return res.status(400).json({
        msg: "Error",
        err: "No file uploaded",
      });
    }

    const result = await createNewImageProduct(id, file.filename); // Menggunakan file.filename atau file.originalname
    return res.status(200).json({
      msg: "Gambar berhasil diunggah",
      data: result.rows,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Log pesan kesalahan untuk debugging
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const getImageProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await getAllImageProduct(); // Menggunakan file.filename atau file.originalname
    return res.status(200).json({
      msg: "Gambar berhasil diunggah",
      data: result.rows,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Log pesan kesalahan untuk debugging
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};