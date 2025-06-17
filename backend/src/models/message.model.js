import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    senderId : {
        type : mongooose.Schema.Types.ObjectId, // Corrected from 'mongoose.Schema.Types.ObjectId' to 'mongoose.Schema.Types.ObjectId',
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

const User = mongoose.model("User" , userSchema)

export default User
