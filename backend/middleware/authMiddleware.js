const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

// Check credentials with jsonwebtoken in cookie.jwt. If is not valid you can't go to the next()
// -------------------------------------------------------------------------------------------------------
const requireAuth = async (req, res, next) => {
  const userToken = req.cookies.jwt

  if (userToken) {
    const { id } = await jwt.verify(userToken, process.env.JWT_SECRET)
    // With the retrieved id from token, check if user exists in database
    try {
      let user = await User.findById(id)
      if (user) {
        user.password = undefined
        req.user = user
        next()
      } else {
        return res.status(401).json({ error: "Wrong credentials" })
      }
    } catch (error) {
      return res.status(400).json(error)
    }
  } else {
    return res.status(401).json({ error: "No token" })
  }
}

module.exports = requireAuth
