//Enviroment variables
require("dotenv").config()
// Express
const express = require("express")
const app = express()
//Database
const mongoose = require("mongoose")
//Cookies
const cookieParser = require("cookie-parser") // Add cookie to res, req objects. res.cookie() to set one. req.cookies() to get them.
app.use(cookieParser())

const path = require("path")
const requireAuth = require("./middleware/authMiddleware")

//Cors and json, and middleware
var cors = require("cors")
app.use(cors())
app.use(express.json())

// Limiting number of request to the API
// const rateLimit = require('express-rate-limit')
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })
// app.use(limiter)

//Routes
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/books", requireAuth, require("./routes/booksRoutes"))

// For production - Serving the frontend
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "..", "frontend", "build")))
//     app.get("*", (req, res)=>{
//         res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"))
//     })
// }

//Connect to DB and run app
mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & running on port: ${process.env.PORT}`)
    })
  )
  .catch((err) => console.log(err))
