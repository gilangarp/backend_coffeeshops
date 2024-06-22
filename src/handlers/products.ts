import { Request, Response } from "express-serve-static-core";
import { createNewImageProduct, createProduct, getAllProduct, getOneProduct, getTotalProduct, updateOneProduct } from '../repositories/products';
import { IproductBody, IproductQuery, IproductResponse } from '../models/products';
import getLink from "../helper/getLink";
import db from '../configs/pg';
import { cloudinaryUploader } from "../helper/cloudinary";

export const createNewProduct = async (req: Request<{},{},IproductBody>, res: Response) => {
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
      };
      const productIds = product.rows[0].id;
      console.log(productIds)
      if (!productIds) throw new Error("Id product tidak ditemukan");
      const { result, error } = await cloudinaryUploader(req, "productimg", productIds);
      if (error) throw error;
      if (!result) throw new Error("Upload gagal");
      const imgProduct = await createNewImageProduct(client,productIds,result.secure_url);
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
};

export const getProduct = async (req: Request<{}, {}, {}, IproductQuery>, res: Response<IproductResponse>) => {
  try {
      // Mengambil semua produk dengan menggunakan query yang diberikan
      const result = await getAllProduct(req.query);//
      if (!result){
        return res.status(404).json({
            msg: "Error",
            err: "Data Not Found",
        });
      }
      // Mendapatkan total produk 
      const dataProduct = await getTotalProduct();
      // Mendapatkan nomor halaman saat ini
      const page = parseInt((req.query.page as string) || "1");
      // Mendapatkan total data produk dari hasil penghitungan
      const totalData = parseInt(dataProduct.rows[0].total_product);
      // Menghitung total halaman berdasarkan total data dan batasan (limit) data per halaman
      const totalPage = Math.ceil(totalData / (parseInt(req.query.limit || '4')));
      console.log(totalPage);
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
    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
        errorMessage = err.message;
        if (errorMessage.includes('Sort invalid options')) {
            errorMessage = "Sort invalid options. Allowed options are: cheapest, priciest, a-z, z-a, latest, longest.";
        } else if (errorMessage.includes('Category invalid options')) {
            errorMessage = "Category invalid options. Allowed options are: drink, snack, heavy meal.";
        }
    }
      return res.status(500).json({
          msg: "Error",
          err: "Internal Server Error",
      });
  }
};

export const getDetailProduct = async (req: Request, res: Response<IproductResponse>) => {
  const { id } = req.params
  try {
    const result = await getOneProduct(id)
    return res.status(201).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err) {
      return res.status(500).json({
          msg: "Error",
          err: "Internal Server Error",
      });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
      const client = await db.connect();
      const { file, params: { id }, body } = req;
      try {
        await client.query("BEGIN");
        
        // Jika hanya product body yang terisi
        if (Object.keys(body).length > 0) {
          const product = await updateOneProduct(id, req.body);
          return res.status(201).json({
            msg: "Success",
            data: product.rows
          });
        }
        
        // Jika hanya img product yang terisi
        if (file) {
        const { result, error } = await cloudinaryUploader(req, "productimg", id as string);
        console.log(result)
        if (error) throw error;
        if (!result) throw new Error("Upload gagal")
        const imgProduct = await updateOneProduct(id,body, result.secure_url);
      console.log(imgProduct)
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
