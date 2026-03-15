import path from "path"
import express from "express"
import cors from "cors"
import "dotenv/config"

import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

// app config
const app = express()
const port = process.env.PORT || 5000
const __dirname = path.resolve()

// connect database
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// test route
app.get("/", (req, res) => {
  res.send("Prescripto Backend Running 🚀")
})

// API routes
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/user", userRouter)

// frontend build serve
app.use("/frontend", express.static(path.join(__dirname, "/frontend/dist")))
app.use("/admin", express.static(path.join(__dirname, "/admin/dist")))

// frontend routes
app.get("/frontend/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
})

app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/admin/dist/index.html"))
})

// server start
app.listen(port, () => console.log("Server started on PORT:", port))