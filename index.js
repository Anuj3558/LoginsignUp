import 'dotenv/config'
import express from "express";
import router from "./rotutes/user.js";
import connectTomongoDb from "./connection.js";
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"


const app =express();
const port =process.env.PORT;
//Db connection

connectTomongoDb(process.env.MONGO_URL);

//middle wares
app.use(cors({
    origin: process.env.ORIGIN_VAL,
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/",router);


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})