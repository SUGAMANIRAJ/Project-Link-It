import mongoose from 'mongoose';


const DBConnection = async () =>{

    const DB_URI = "mongodb+srv://rajsugamani:linkit1234@linkit.efmge.mongodb.net/?retryWrites=true&w=majority&appName=linkIt";
    try{
        await mongoose.connect(DB_URI);
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.error("Error while connecting to db ",error.message);
    }

}

export default DBConnection;

