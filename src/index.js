// require('dotenv').config({path: './env'}) //but we not use that here because we want consistent behavior like import statements so that

import dotenv from "dotenv"


// import mongoose from mongoose;
// import { DB_NAME } from "./constants";
import express from "express"
import connectDB from "./db/index.js";

dotenv.config({path: './env'})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`server is running ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongodb connection failed : ",err);
})

// const app = express();
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log('Connected to MongoDB');
//         app.on('error', (err) => {console.log("err",error);
//         throw error;
//     })
//     app.listen(process.env.PORT,() => {
//         console.log(`server is running ${process.env.PORT}`);
//     })

//     } catch (error) {
//         console.log(error);
//         throw err
//     }
// })