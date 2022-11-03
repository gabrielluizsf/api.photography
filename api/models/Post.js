import {Schema, model} from "mongoose";

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      banner: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      likes: {
        type: Array,
        required: true,
      },
      comments: {
        type: Array,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    });
    
    const Post = model("Post", PostSchema);

    export default Post;