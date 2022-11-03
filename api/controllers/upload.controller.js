import {uploadService,findAllImageService, findByIdService, deleteImageService} from "../services/upload.service.js";
import {removeFolder,createFolder} from "../config/temp.config.js";

const uploader = async(req,res)=>{
    try{
    const photos = await uploadService(req);
   
    removeFolder("./temp/uploads");
    return res.send({message:"Photos Created"});
}
catch(err){
    res.status(400).send({message: err});
}
}

const createUploader = async(req,res,next)=>{
    
const creator = await createFolder("./temp/uploads");
        
next();

}

const findALL = async(req,res)=>{
    try{
    const photos = await findAllImageService();
    if (photos.length === 0) {
        return res.status(400).send({ message: "[ERROR]0 IMGS" });
    }
    res.send({
        results: photos.map((item) => ({
            name: item.name,
            size: item.size,
            key: item.key
        })),
    });
}
catch (err) {
  res.status(500).send({ message: err.message });
}
}

export const finder = async(req,res)=>{
    try{
        const {id}  = req.params;
        const photo = await findByIdService(id);
        return res.send({content: photo});
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
}

export const imageDeleter = async(req,res)=>{
    try{
        const {id}  = req.params;
        const photo = await findByIdService(id);
        await deleteImageService(id);
        return res.send({message:"Photo deleted sucessfully"});
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
}


export {createUploader,uploader,findALL};