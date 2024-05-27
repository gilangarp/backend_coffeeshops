import { Request, Response } from "express-serve-static-core";
import { IuserRegisterBody , IusersQuery, IuserLoginBody } from "../models/users";
import bcrypt from "bcrypt";
import { deleteOneUser, getAllUsers,getPwdUser,registerUser,updateOneUser } from "../repositories/users";

export const registerNewUser = async (req: Request<{}, {}, IuserRegisterBody>,res: Response<{ msg: string; data?: any[]; err?: string }>) => {
  const { username , user_pass } = req.body;
  try {
    //password
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(user_pass, salt);
    
    // menyimpan kedalam db
    const result = await registerUser(req.body, hashed);
    return res.status(201).json({
      msg: "Success",
      data: result.rows,
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
        console.log(err.message);
      }
      return res.status(500).json({
        msg: "Error",
        err: "Internal Server Error",
      });
    }
  };

export const updateUsers = async (req: Request ,res: Response) => {
    const { id } = req.params;
    const { user_pass } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(user_pass, salt);
      const result = await updateOneUser(id, req.body, hashed);
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

export const getUsers = async (req: Request<{},{},{},IusersQuery>, res: Response) => {
    try{
        const result = await getAllUsers(req.query);
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

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const result = await deleteOneUser(id);
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

export const loginUser = async (
    req: Request<{}, {}, IuserLoginBody>,
    res: Response<{ msg: string; data?: any[]; err?: string }>
  ) => {
    const { user_email ,user_pass } = req.body;
    try {
      // User login menggunakan username
      const result = await getPwdUser(user_email);
      // handling jika password tidak ditemukan
      if (!result.rows.length) throw new Error("Siswa tidak ditemukan");
      const { user_pass: hash, username } = result.rows[0];
      // mengecek apakah password sama
      const isPwdValid = await bcrypt.compare(user_pass, hash);
      // handling jika password salah
      if (!isPwdValid) throw new Error("Login gagal");
      return res.status(200).json({
        msg: `Selamat datang, ${username}!`,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (/(invalid(.)+id(.)+)/g.test(error.message)) {
          return res.status(401).json({
            msg: "Error",
            err: "Siswa tidak ditemukan",
          });
        }
        return res.status(401).json({
          msg: "Error",
          err: error.message,
        });
      }
      return res.status(500).json({
        msg: "Error",
        err: "Internal Server Error",
      });
    }
  };
  