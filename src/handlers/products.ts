import { Request, Response } from "express-serve-static-core";
import { createProduct, getAllProduct, updateOneProduct } from "../repositories/products";
import { IproductBody, IproductQuery, IproductResponse } from "../models/products";
import getLink from "../helper/getLink";

export const createNewProduct = async (req: Request<IproductBody>, res: Response<IproductResponse>) => {
  try {
      const result = await createProduct(req.body);
      if (!result) {
          return res.status(404).json({
              msg: "Error",
              err: "Data Not Found",
          });
      }
      return res.status(201).json({
          msg: "Success",
          data: result.rows,
      });
  } catch (err: unknown) {
      if (err instanceof Error) {
          if (err.message.includes('duplicate key value violates unique constraint "product_name"')) {
              return res.status(400).json({
                  msg: "Error",
                  err: "Product name already exists",
              });
          } else {
              console.log(err.message);
              return res.status(500).json({
                  msg: "Error",
                  err: "Internal Server Error",
              });
          }
      }
  }
};

export const getProduct = async (req: Request<{}, {}, {}, IproductQuery>, res: Response<IproductResponse>) => {
    try {
        const result = await getAllProduct(req.query);
        const totalData = result.rows.length; // Mengambil panjang array sebagai total data

        // Mendapatkan data total page
        const totalPage = Math.ceil(totalData / (parseInt(req.query.limit || "3" ))); 
        // Menetapkan batas default 3 karena kemungkinan error "limit possible to undefined"

        const page = parseInt(req.query.page || '1'); 
        // Mendapatkan nomor halaman dari query

        // Menyusun respons
        const response = {
            msg: "success",
            data: result.rows,
            meta: {
                totalData,
                totalPage,
                page,
                prevLink: page > 1 ? getLink(req, "previous") : null,
                nextLink: page != totalPage ? getLink(req, "next") : null,
            }
        };

        // Mengembalikan respons
        return res.status(200).json(response);
    } catch (err) {
        // Menangani kesalahan
        if (err instanceof Error) {
            console.log(err.message);
        }
        return res.status(500).json({
            msg: "Error",
            err: "Internal Server Error",
        });
    }
};

export const updateProduct = async (req: Request ,res: Response<IproductResponse>) => {
    const { id } = req.params;
    try {
      const result = await updateOneProduct(id, req.body);
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
};

/* export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await deleteOneProduct(id);
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
}; */

