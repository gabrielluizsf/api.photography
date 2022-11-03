import {Schema,model} from "mongoose";

const PhotosSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt:{
        type: Date,
        default: Date.now,
    }
});


const Photos = model("Photos",PhotosSchema);

export default Photos;