import Post from "../models/Post.js";

const createService = (body) => Post.create(body);

const findAllService = (offset,limit) => 
    Post.find().sort({_id: -1}).skip(offset).populate("user");

const countService = () => Post.countDocuments();

const topPostService = () => 
    Post.findOne().sort({_id: -1}).populate("user");

const findByIdService= (id) =>
    Post.findById(id).populate("user");

const searchByTitleService = (title) =>
    Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
     })
    .sort({ _id: -1 })
    .populate("user");

const ByUserService = (id) => 
    Post.find({user: id}).sort({ _id: -1}).populate("user");

const updateService = (id,title,text,banner) =>
    Post.findOneAndUpdate({_id: id},{title,text,banner},{rawResult: true,});

const deleteService = (id)=>
    Post.findOneAndDelete({_id: id});

const updateLikesService = (id,userId)=>
    Post.findOneAndUpdate(
    {_id: id,"likes.userId":{$nin: [userId]}},
    {$push:{likes:{userId, created: new Date() }}}
    );

const deleteLikeService = (id,userId)=>
    Post.findOneAndUpdate(
        {_id: id,"likes.userId":{$nin: [userId]}},
        {$pull:{likes:{userId}}}
    );

export const addingCommentsService = (id,comment,userId)=>{
const idComment = Math.floor(Date.now()*Math.random()).toString(36);
return Post.findOneAndUpdate(
    {_id: id},
    {$push:{
        comments:{idComment,userId,comment,createdAt: new Date()}
    }});
}
export const deleteCommentService = (idPost,idComment,userId)=>{
    return Post.findOneAndUpdate(
        {_id: idPost},
        {$pull:{
            comments:{idComment,userId}
        }});
    }

export {
    createService,
    findAllService,
    countService,
    topPostService,
    findByIdService,
    searchByTitleService,		
    ByUserService,
    updateService,
    updateLikesService,
    deleteService,
    deleteLikeService
}
