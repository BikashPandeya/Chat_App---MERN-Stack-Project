import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import {connectDB} from './lib/db.js'
import authRoutes from './routes/auth.route.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())  //Without this middleware, req.body would be undefined for JSON requests.
// The express.json() middleware in app.use() is used to parse incoming requests with JSON payloads. When you include this middleware in your Express application, it allows the server to automatically parse the JSON data in the body of incoming requests and make it available in req.body.

app.use(cookieParser()) // Add cookie-parser middleware

app.use("/api/auth" , authRoutes)

app.listen(PORT , () => {
    console.log("Server is running on PORT :" , PORT)
    connectDB()
})