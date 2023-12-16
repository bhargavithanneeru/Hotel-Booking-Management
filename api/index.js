import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import paymentRoute from './routes/payment.js'
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"

const app = express()
dotenv.config()

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb")
      } catch (error) {
        throw error
      }

}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
})

//middleware
app.use(cors({origin: true,
              credentials: true,
              methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',}))
// app.use(cors())
app.use(cookieParser({sameSite: 'None'}))
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/payment", paymentRoute);

app.use((err,req, res, next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!!!"
  return res.status(errorStatus).json({
    success:false,
    status: errorStatus,
    message: errorMessage,
    stack:err.stack,
  })
})

app.listen(process.env.PORT, ()=>{
    console.log('Listening on port: ' + process.env.PORT)
    connect()
    console.log("connected to backend!!")
})


