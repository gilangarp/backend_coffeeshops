import { NextFunction, Request, Response } from "express-serve-static-core";
import { AppParams } from "../models/params";
import { IauthResponse } from "../models/response";
import jwt, { SignOptions } from "jsonwebtoken"
import { Ipayload } from '../models/payload';

export const jwtOptions: SignOptions = {
  expiresIn: "5m",
  issuer: process.env.JWT_ISSUER,
}

export const authorization =(role?: string[]) => (req: Request<AppParams> ,res: Response<IauthResponse> , next: NextFunction ) => {
  const bearerToken = req.header("Authorization");
  if(!bearerToken){
    return res.status(403).json({
      msg :"Forbidden",
      err: "tidak memiliki akses"
    })
  }
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, <string>process.env.JWT_SECRET, jwtOptions, (err, payload) => {
    // kalo tidak valid, ditolak
    if (err) {
      return res.status(403).json({
        msg: err.message,
        err: err.name,
      });
    }
    // pengecekan role
    if (role) {
      if (!role.includes((payload as Ipayload).role as string)) {
        return res.status(403).json({
          msg: "Forbidden",
          err: "Akses tidak diperbolehkan",
        });
      }
    }
    // kalo valid, lanjut
    req.userPayload = payload;
    next();
  });
};
