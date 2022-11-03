import Photos from "../models/Photos.js";


const uploadService = (req)=>{
const {originalname: name,size,filename: key} = req.file;
Photos.create({
    name,
    size,
    key,
    url: req.url,
});

}

const deleteImageService = (id)=>{
    Photos.findOneAndDelete({_id: id});
}

const findAllImageService = ()=> 
    Photos.find().sort({_id: -1});

export const findByIdService = (id)=>
    Photos.find({_id: id});

export{uploadService,deleteImageService,findAllImageService}