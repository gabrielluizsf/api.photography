import mongoose from "mongoose";
import { findByIdService } from "../services/posts.service.js";
import userService from "../services/user.service.js";

const isValidId = (req,res,next)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).send({message:"Invalid ID"});
    }
    next();
}
const isValidUser = async (req,res,next)=>{
    const id = req.params.id;
    const user = await userService.findByIdService(id);
    if(!user){
      return res.status(400).send({message:"[ERROR]USER NOT FOUND"});
   }
   req.id = id;
   req.user = user;
   next();
}
export const isValidPost = async (req,res,next)=>{
   const id = req.params.id;
   const post = await findByIdService(id);
   if(!post){
    return res.status(400).send({message:"[ERROR] POST NOT FOUND"});
   }
   
  if(post.user._id != req.userId){
    return res.send({message: "You didn't update this post"});
  }
   const {title,text,banner} = req.body;
   if (!title && !text && !banner){
    res.status(400).send({message:"Submit at least one field to update the post"});
   }
   const titleContent  = title;
   const textContent   = text;
   const bannerContent = banner;
  req.id      = id;
  req.title   = titleContent;
  req.text    = textContent;
  req.banner  = bannerContent;
  next();
}

export default{isValidId,isValidUser}
