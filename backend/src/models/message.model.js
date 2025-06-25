import mongoose from "mongoose";
import User from "./user.model.js"; // Corrected import statement to match the file structure

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId, // Corrected from 'mongoose.Schema.Types.ObjectId' to 'mongoose.Schema.Types.ObjectId',
        ref  : "User" ,// Corrected from 'User' to string "User" for consistency
        required : true ,
    } , 
    receiverId : {
        type : mongoose.Schema.Types.ObjectId, // Corrected from 'mongoose.Schema.Types.ObjectId' to 'mongoose.Schema.Types.ObjectId',
        ref : User , 
        required  : true ,
    }, text : {
        type : String ,
        
    },
    image : {
        type : String ,
    }
}, {timestamps : true}) // Corrected from 'timestamp' to 'timestamps'

const 
Message = mongoose.model("Message" , messageSchema)

export default Message
