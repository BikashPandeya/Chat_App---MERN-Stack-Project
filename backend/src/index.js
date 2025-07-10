import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import {connectDB} from './lib/db.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app , server } from './lib/socket.js'


import cors from 'cors'
import path from "path"

dotenv.config()
const PORT = process.env.PORT
const __dirname = path.resolve() // Get the current directory path

app.use(express.json({ limit: "10mb"}))  //Without this middleware, req.body would be undefined for JSON requests.
// The express.json() middleware in app.use() is used to parse incoming requests with JSON payloads. When you include this middleware in your Express application, it allows the server to automatically parse the JSON data in the body of incoming requests and make it available in req.body.

app.use(cookieParser()) // Add cookie-parser middleware
app.use(cors({
    origin : "http://localhost:5173", // Replace with your frontend URL
    credentials : true, // Allow credentials (cookies, authorization headers, etc.) to be sent
}))


app.use("/api/auth" , authRoutes)
app.use("/api/messages" , messageRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist"))) // Serve static files from the frontend build directory
   app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) // Serve the index.html file for all other routes
    })
}

server.listen(PORT , () => {
    console.log("Server is running on PORT :" , PORT)
    connectDB()
})