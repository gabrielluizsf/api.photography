import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";


export default{
    dest: path.resolve("./","temp","uploads"),
    storage: multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,path.resolve("./","temp","uploads"))
        },
        filename: (req,file,cb)=> {
            crypto.randomBytes(16, (err, hash)=>{
                if(err)cb(err)
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null,fileName);
            });
          
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter : (req,file,cb)=> {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/svg',
            'image/ico'
        ]
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Invalid File Type"))
        }
    }

}