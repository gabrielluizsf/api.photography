import mongoose from "mongoose";


const connectDatabase = () => {
    console.log("Wait Connect to the Database");

    mongoose.connect(process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Database Conected"))
        .catch((error) => { console.log(error) });
}

export default connectDatabase;
