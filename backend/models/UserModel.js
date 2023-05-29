const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// Run a function before a doc is saved in the database - Use "function" to access "this"
// Hash the password before saving to database
UserSchema.pre("save", async function (next) {
  // console.log("Run this function BEFORE saved doc to db", this)
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Run a function after a doc is saved in the database
// UserSchema.post("save", (doc, next) => {
//     console.log("Run this function AFTER saved doc to db", doc)
//     next()
// })

const User = mongoose.model("user", UserSchema)

module.exports = User
