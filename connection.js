import mongoose from "mongoose";
const connectTomongoDb =(url)=>{
    try{
        mongoose.connect(url);
        console.log("Mongo db Connection sucessfull");
    }
    catch(err){
        console.log("Error : "+err);
    }
}
export default connectTomongoDb;