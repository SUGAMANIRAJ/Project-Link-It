import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBConnection = async () =>{

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.error("Error while connecting to db ",error.message);
    }

}

export default DBConnection;

