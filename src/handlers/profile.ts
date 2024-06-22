import { Request, Response } from "express-serve-static-core";
import {  checkIfProfileExists, createOneProfile, getAllProfile, getNameUser, getOnelProfile, updateOneProfile } from "../repositories/profile";
import { cloudinaryUploader } from "../helper/cloudinary";
import db from "../configs/pg";

export const createNewProfile = async (req: Request, res: Response) => {
    try{
        const client = await db.connect();
        const {body,params: {username}}= req;
        try {
            //panggil user yang mau di buatkan profile
            await client.query("BEGIN")
            const user = await getNameUser(username);
          
        const productIds = user.rows[0].id;
        if (!productIds) throw new Error("Id User tidak ditemukan");
        const { result, error } = await cloudinaryUploader(req, "productimg", productIds);
        if (error) throw error;
        if (!result) throw new Error("Upload gagal");
        const Profile = await createOneProfile(body,result.secure_url,productIds);
        await client.query("COMMIT");
        return res.status(201).json({
          msg: "Success",
          data: [user.rows, Profile.rows]
        })
        } catch(error){
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
    }catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('duplicate key value violates unique constraint "unique_users_id"')) {
            return res.status(400).json({
                msg: "Error",
                err: "Profile has been created",
            });
        }
      };
      return res.status(500).json({
        msg: "Error",
        err: "Internal Server Error",
      });
   }
};

export const getProfile = async (req: Request, res: Response) => {
    try{
        const result = await getAllProfile();
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

export const getDetailProfile = async (req: Request, res: Response) => {
    const { id } = req.params
    try{
        const result = await getOnelProfile(id);
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

export const updateProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const profileExists = await checkIfProfileExists(id);
        console.log(profileExists)
        if (!profileExists) {
            return res.status(404).json({
                msg: "Users id tidak ditemukan",
            });
        }
        const result = await updateOneProfile(id,req.body);
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
}