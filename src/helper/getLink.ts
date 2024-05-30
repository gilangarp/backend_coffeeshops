import { Request } from "express";

import { URL } from 'url';
import { AppParams } from "../models/params";
import { IproductQuery } from "../models/products";

const getLink = (req: Request<AppParams, {}, {}, IproductQuery>, info?: "previous" | "next"): string => {
    const { path, hostname, query, protocol } = req;
  
    // Mendapatkan nomor halaman saat ini
    let currentPage = parseInt(query.page as string);
    if (isNaN(currentPage)) {
      currentPage = 1; // Jika tidak ada nomor halaman yang valid, gunakan 1 sebagai default
    };
  
    // Menentukan nomor halaman baru berdasarkan info ("previous" atau "next")
    let newPage = currentPage;
    if (info === "next") {
      newPage++;
    } else if (info === "previous") {
      newPage = Math.max(currentPage - 1, 1); // Pastikan tidak kurang dari 1
    }
  
    // Memperbarui query string dengan nomor halaman yang baru
    const newQuery = { ...query, page: `${newPage}` };
  
    // Membuat objek URL baru
    const url = new URL(`${protocol}://${hostname}:${process.env.PORT}${path}`);
    
    // Menambahkan parameter baru ke objek URL
    for (const [key, value] of Object.entries(newQuery)) {
      if (value !== undefined) {
        url.searchParams.append(key, value as string);
      }
    }
  
    return url.toString();
  };
  
  export default getLink;

