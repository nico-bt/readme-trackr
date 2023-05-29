const User = require("../models/UserModel")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Book = require("../models/BookModel")
const DEFAULTS_BOOKS_DATA = require("./defaultBooksData")

// Helper function
// *******************************************************************************
const daysInSecs = 3 * 24 * 60 * 60
function createToken(id) {
  // ({payload}, "secret", {options - ej: duración en segundos})
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: daysInSecs })
}

// Controllers
// *******************************************************************************

// Check if user is logged in. To enable React check in cookie containing jwt
//-----------------------------------------------------------------------------
const getUser = async (req, res) => {
  const userToken = req.cookies.jwt
  if (userToken) {
    const { id } = jwt.verify(userToken, process.env.JWT_SECRET)
    // With the retrieved id from token, check if user exists in database
    try {
      let user = await User.findById(id)
      if (user) {
        user.password = undefined
        return res.json(user)
      }
    } catch (error) {
      return res.status(400).json(error)
    }
  } else {
    return res.json(null)
  }
}

// Create New user when signup
//-----------------------------------------------------------------------------
const createNewUser = async (req, res) => {
  const { email, password, defaultBooks } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all fields" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email" })
  }

  try {
    let user = await User.create({ email, password })
    //Obs: Password is hashed in the User Model before saving in db

    const token = createToken(user._id)
    res.cookie("jwt", token, { httpOnly: true, maxAge: daysInSecs * 1000 })

    //Remove password for returning it. Although it is hashed in User model
    user.password = undefined

    // Create some default books to add to the user if its passed as "yes"
    if (defaultBooks === "yes") {
      DEFAULTS_BOOKS_DATA.forEach(async (book) => {
        await Book.create({
          ...book,
          user: user._id,
        })
      })
    }

    res.status(201).json(user)
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({ error: `${email} is already registered` })
    }
    res.status(400).json(error)
  }
}

// Check credentials and log in user
//-----------------------------------------------------------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all fields" })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: "Email not registered" })
    }

    const auth = await bcrypt.compare(password, user.password)

    if (auth) {
      const token = createToken(user._id)
      res.cookie("jwt", token, { httpOnly: true, maxAge: daysInSecs * 1000 })
      user.password = undefined
      return res.json(user)
    } else {
      return res.status(400).json({ error: "Wrong password" })
    }
  } catch (err) {
    res.status(400).json(err)
  }
}

// LOGOUT user
//-----------------------------------------------------------------------------
const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 })
  return res.json({ msg: "Logged out" })
}

module.exports = { getUser, createNewUser, loginUser, logoutUser }
