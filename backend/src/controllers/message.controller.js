import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; 
        const filteredUsers = await User.find({_id : {$ne: loggedInUserId}}).select("-password")

        res.status(200).json({filteredUsers});
    } catch (error) {
        console.error("Error in message controller in getUsersForSideBar function", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId : myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId}
            ]
        });
        res.status(200).json({ messages });
    } catch (error) {
        console.error("Error in message controller in getMessages function", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text , image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url; // Assuming you're using Cloudinary for image uploads
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // Todo : Realtime fuctionality using socket.io

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error in message controller in sendMessage function", error);
        res.status(500).json({ message: "Internal server error" });
    }
}