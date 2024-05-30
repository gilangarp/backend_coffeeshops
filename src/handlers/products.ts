import { Request, Response } from "express-serve-static-core";
import { createProduct, getAllProduct, getTotalProduct, updateOneProduct } from "../repositories/products";
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
        // Mengambil semua produk dengan menggunakan query yang diberikan
        const result = await getAllProduct(req.query);

        // Mendapatkan total produk 
        const dataProduct = await getTotalProduct();
        // Mendapatkan nomor halaman saat ini
        const page = parseInt((req.query.page as string) || "1");
        // Mendapatkan total data produk dari hasil penghitungan
        const totalData = parseInt(dataProduct.rows[0].total_product);
         // Menghitung total halaman berdasarkan total data dan batasan (limit) data per halaman
        const totalPage = Math.ceil( totalData/ (parseInt(req.query.limit || '4') )) ;
        console.log(req.baseUrl)
        // Membentuk objek respons dengan pesan sukses, data produk, dan meta-informasi
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

        // Mengirimkan respons JSON dengan status 200 OK ke klien
        return res.status(200).json(response);

    } catch (err) {

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

