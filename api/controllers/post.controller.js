import {
   createService, findAllService, findByIdService ,
   countService, topPostService, searchByTitleService, 
   ByUserService ,updateService,updateLikesService,addingCommentsService,
   deleteService, deleteLikeService,  deleteCommentService
  } from "../services/posts.service.js";


export const create = async (req, res) => {
    try {
        const { banner, title, text } = req.body;
        if (!title || !banner || !text) {
            res.status(400).send({
                message: "Submit All Fields for Registration"
            });
        }
        await createService({
            banner,
            title,
            text,
            user: req.userId

        })

        res.status(201).send({ message: "Post created" });
    }
    catch (err) {
      res.status(500).send({ message: err.message });
    };

}

export const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }
        if (!offset) {
            offset = 0;
        }

        const posts = await findAllService();
        const total = await countService();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl =
            next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl =
            previous != null ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
       
            if (posts.length === 0) {
            return res.status(400).send({ message: "[ERROR]0 REGISTERED POSTS" });
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: posts.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            })),
        });
    }
    catch (err) {
      res.status(500).send({ message: err.message });
    }
}

export const topPost = async (req, res) => {
    try {
        const posts = await topPostService();
        res.send({
            posts: {
                id: posts._id,
                title: posts.title,
                text: posts.text,
                banner: posts.banner,
                likes: posts.likes,
                comments: posts.comments,
                name: posts.user.name,
                username: posts.user.username,
                userAvatar: posts.user.avatar
            }
        })
    }
    catch (err) {
      res.status(500).send({ message: err.message });
    }
}

export const findById = async(req,res)=>{
     try{
      const id = req.params.id;
      const posts = await findByIdService(id);
      res.send({
        post: {
            id:         posts._id,
            title:      posts.title,
            text:       posts.text,
            banner:     posts.banner,
            likes:      posts.likes,
            comments:   posts.comments,
            name:       posts.user.name,
            username:   posts.user.username,
            userAvatar: posts.user.avatar 	  
          } 
      })	     
     }
     catch(err){
      res.status(500).send({message: err});
     }
}
export const searchByTitle = async(req,res)=>{
    try {
        const { title } = req.query;
        const posts = await searchByTitleService(title);
    
        if (posts.length === 0) {
          return res
            .status(400)
            .send({ message: "There are no posts with this title" });
        }
    
        return res.send({
          results: posts.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            username: item.user.username,
            userAvatar: item.user.avatar,
          })),
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    };
export const ByUser = async(req,res)=>{
  try{
  const id = req.userId;
  const posts = await ByUserService(id);
    return res.send({
      results: posts.map((item)=>({
        id:         item._id,
        title:      item.title,
        text:       item.text,
        banner:     item.banner,
        likes:      item.likes,
        comments:   item.comments,
        name:       item.name,
        username:   item.username,
        userAvatar: item.userAvatar,
      }),
    )
    });
  }catch(err){
    res.status(500).send({message:err.message});
  }
}
export const update = async(req,res)=>{
  try{
  const id     = req.id;
  const title  = req.title;
  const text   = req.text;
  const banner = req.banner;
    await updateService(id,title,text,banner);
    return res.send({message:"Post successfully updated!"});
  }
  catch(err){
    res.status(500).send({message:err.message});
  }
}
export const updateLikes = async(req,res)=>{
  const {id}   = req.params;
  const userId = req.userId;
  const likedPost = await updateLikesService(id,userId);
  if(!likedPost){
    await deleteLikeService(id,userId);
    return res.send({message: "like removed"});
  }else{
  res.send({message:"liked"});
  }

}
export const deleter = async(req,res)=>{
  try{
    const { id } = req.params;
    const post   = await findByIdService(id);
    if(post.user._id != req.userId){
      return res.send({message: "You didn't delete this post"});
    }
      await deleteService(id);
      return res.send({message:"Post deleted successfully"});
    }
    catch(err){
      res.status(500).send({message:err.message});
    }
  }
  export const addingComments = async(req,res)=>{
    try{
    const {id}    = req.params;
    const userId  = req.userId;
    const {comment} = req.body;

    if(!comment){
      return res.status(400).send({"message":"[BAD REQUEST]: Need Write a Message to Comment"})
    }
    await addingCommentsService(id,comment,userId);
    res.send({
      "message":"Post Successfully Commented"
    });
  }catch(error){
    res.status(500).send({"message":error.message});
  }
  }
  export const deleteComment = async(req,res)=>{
    try{
      const {idPost,idComment}    = req.params;
      const userId  = req.userId;

      const commentDeleted = await deleteCommentService(idPost,idComment,userId);

      const commentFinder = commentDeleted.comments.find(
        (comment) => comment.idComment === idComment
      );
  
      if (!commentFinder) {
        return res.status(404).send({ message: "[ERROR]:Comment not found" });
      }
  
      if (commentFinder.userId !== userId) {
        return res.status(400).send({ message: "[ERROR]:You can't delete this comment" });
      }
      res.send({
        "message":"Comment Successfully Removed"
      });
    }
    catch(error){
      res.status(500).send({"message":error.message});
    }
  }
  
