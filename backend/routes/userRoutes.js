const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Controllers
const { getUser, createNewUser, loginUser, logoutUser } = require("../controllers/userControllers")

// GET user infosignup form | endpoint: api/user
router.get("/", getUser)

// CREATE a New USer | endpoint: api/user/signup
router.post("/signup", createNewUser)

// LOGIN User | endpoint: api/user/login
router.post("/login", loginUser)

// LOGOUT user | endpoint: api/user/logout
router.get("/logout", logoutUser)

module.exports = router
