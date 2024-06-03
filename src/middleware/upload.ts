import multer, { Field, Options, diskStorage } from "multer";
import path from "path";

const multerDisk = diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/imgs"); 
    },
    filename: (req, file, cb) => { 
      const extName = path.extname(file.originalname); 
      const newFileName = `image-${Date.now()}${extName}`;
      cb(null, newFileName); 
    },
  });

  const multerOptions: Options = {
    storage: multerDisk,
    limits: {
      fileSize: 3e6,
    },
    fileFilter: (req, file, cb) => {
      const allowedExtRe = /jpg|png|jpeg/gi;
      const extName = path.extname(file.originalname);
      if (!allowedExtRe.test(extName)) return cb(  new Error("Incorrect File"));
      cb(null, true);
    },
  };

  const uploader = multer(multerOptions);

  export const singleUpdloader = (fieldName: string) => uploader.single(fieldName);
  export const multiUploader = (fieldName: string, maxCount: number) => uploader.array(fieldName, maxCount);
  export const multiFieldUploader = (fieldConfig: Field[]) => uploader.fields(fieldConfig);
  
