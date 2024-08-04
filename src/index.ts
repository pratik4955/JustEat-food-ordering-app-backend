import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./routes/myUserRoutes";
import { v2 as cloudinary } from "cloudinary";
import MyRestaurantRoute from "./routes/MyRestaurantRoute";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>console.log("Connected to Database!"));

cloudinary.config(
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })
)
const app=express();
app.use(express.json());
app.use(cors());
app.get("/health",async(req:Request,res:Response)=>{
    res.send({message:"Health ok!"});
});
app.use("api/my/user",myUserRoutes)
app.use("/api/my/restaurant",MyRestaurantRoute);
app.listen(7000,()=>{console.log("server started")});
