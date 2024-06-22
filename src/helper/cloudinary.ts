import { Request } from "express-serve-static-core";
import { UploadApiOptions, UploadApiResponse } from "cloudinary";
import DataUriParser from "datauri/parser";
import path from "path";

import cloudinary from "../configs/cloud";

export const cloudinaryUploader = async (req: Request,prefix: string,id?: string): Promise<{ result?: UploadApiResponse; error?: Error }> => {
  // ambil memory file (buffer)
  const { file } = req;
  if (!file) return { error: Error("File not found") };
  const { buffer } = file;

  // parse buffer menjadi base64
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);
  const base64File = parser.format(extName, buffer);
  if (!base64File.content) return { error: new Error("Failed Parsing") };

  const publicId = `${prefix}-${file.fieldname}-${id}`;

  try {
    // upload ke cloudinary
    const uploadConfig: UploadApiOptions = {
      folder: "coffeeshops",
      public_id: publicId,
    };
    const result = await cloudinary.uploader.upload(base64File.content, uploadConfig);
    return { result };
  } catch (error) {
    if (!(error instanceof Error)) {
      console.log(error);
    }
    return { error: error as Error };
  }
};
