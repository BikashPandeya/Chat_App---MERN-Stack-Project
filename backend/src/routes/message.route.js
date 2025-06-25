import express from 'express' ;
import {protectRoute} from '../middleware/auth.middleware.js' ;
import {getUsersForSideBar , getMessages , sendMessage} from '../controllers/message.controller.js' ;

const router = express.Router() ;

router.get("/users" , protectRoute , getUsersForSideBar)
router.get("/:id" , protectRoute , getMessages) ; // This route can be used to get users for the sidebar
router.post("/send/:id" , protectRoute , sendMessage) ; // This route can be used to get messages between two users


export default router ;
