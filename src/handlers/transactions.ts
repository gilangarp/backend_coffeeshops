import { Request, Response } from "express-serve-static-core";
import { IstatusTransactionBody } from "../models/statusTransaction";
import { createOneTransaction, getAllTransaction, getTotalTransaction, updateOneTransaction } from "../repositories/transactions";
import { ItransactionQuery, ItransactionResponse } from "../models/transactions";
import getLink from "../helper/getLink";

export const createNewTransaction = async (req: Request<IstatusTransactionBody> ,res: Response<ItransactionResponse>) => {
    try{
        const result = await createOneTransaction(req.body);
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

export const getTransaction = async (req: Request<{},{},{},ItransactionQuery> ,res: Response<ItransactionResponse>) => {
    try{
      const result = await getAllTransaction(req.query);
        // Mendapatkan total produk 
      const dataTransaction = await getTotalTransaction();
      // Mendapatkan nomor halaman saat ini
      const page = parseInt((req.query.page as string) || "1");
      // Mendapatkan total data produk dari hasil penghitungan
      const totalData = parseInt(dataTransaction.rows[0].total_transaction);
      // Menghitung total halaman berdasarkan total data dan batasan (limit) data per halaman
      const totalPage = Math.ceil( totalData / (parseInt(req.query.limit || '3')));

      console.log(dataTransaction)
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

export const updateTransaction = async (req: Request ,res: Response<ItransactionResponse>) => {
    const { id } = req.params
    try{
        const result = await updateOneTransaction (id , req.body);
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
  