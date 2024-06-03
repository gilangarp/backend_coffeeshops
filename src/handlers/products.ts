import { Request, Response } from "express-serve-static-core";
import { createProduct, getAllProduct, getTotalProduct, updateOneProduct } from '../repositories/products';
import { IproductQuery, IproductResponse, IproductWithImageProduct, IproductWithImageProductResponse } from "../models/products";
import getLink from "../helper/getLink";
import db from '../configs/pg';
import { createNewImageProduct, updateOneImageProduct } from "../repositories/imageProduct";

export const createNewProduct = async (req: Request<{},{},IproductWithImageProduct>, res: Response<IproductWithImageProductResponse>) => {
  try {
    const client = await db.connect();
    try {
      await client.query("BEGIN")
      const product = await createProduct(req.body);
      if (!product) {
        return res.status(404).json({
            msg: "Error",
            err: "Data Not Found",
        });
    }
      const productIds = product.rows[0].id;
      if (!productIds) throw new Error("Id product tidak ditemukan");
      const { file } = req;
      if (!file) {
        return res.status(400).json({
          msg: "Error",
          err: "No file uploaded",
        });
      }
      const imgProduct = await createNewImageProduct(client,productIds,file?.filename);
      await client.query("COMMIT");
      return res.status(201).json({
        msg: "Success",
        data: [product.rows, imgProduct.rows]
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

export const updateProduct = async (req: Request ,res: Response<IproductWithImageProductResponse>) => {
  const { id } = req.params;
  try {
    const client = await db.connect();
    try {
      await client.query("BEGIN")
      const product = await updateOneProduct(id ,req.body);
      if (!product) {
        return res.status(404).json({
            msg: "Error",
            err: "Data Not Found",
        });
    }
    if(req.file){
      const productId = id;
      console.log(productId)
      if (!productId) throw new Error("Id product tidak ditemukan");
      const { file } = req;
      if (!file) {
        return res.status(400).json({
          msg: "Error",
          err: "No file uploaded",
        });
      }
      const imgProduct = await updateOneImageProduct(client,productId,file?.filename);
      await client.query("COMMIT");
      return res.status(201).json({
        msg: "Success",
        data: [imgProduct.rows]
    })
    
  } else {
        await client.query("COMMIT");
        return res.status(201).json({
          msg: "Success",
          data: [product.rows]
      })   
    } 
      
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


