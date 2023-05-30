const mongoose = require("mongoose")
const Book = require("../models/BookModel")

// GET ALL books
//-----------------------------------------------------------------------
const getAllBooks = async (req, res) => {
  const userID = req.user._id //Passed via authMiddleware
  try {
    const books = await Book.find({ user: userID }).sort({ readComplete: 1, createdAt: -1 })
    res.status(200).json(books)
  } catch (error) {
    res.status(400).json(error)
  }
}

// CREATE New book
//-----------------------------------------------------------------------
const createNewBook = async (req, res) => {
  const { title, author, link } = req.body
  const user = req.user._id //Passed via authMiddleware

  // don't try to create an item in db untill all fields are filled
  if (!title || !author) {
    return res.status(400).json({ error: "Please enter title and author" })
  }

  try {
    const book = await Book.create({ title, author, link, user })
    res.status(200).json(book)
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

// GET SINGLE book
//-----------------------------------------------------------------------
const getSingleBook = async (req, res) => {
  // Check if the passed id is a valid mongoDb type
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "No such book in db" })
  }

  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(400).json({ error: "No such book in db" })
    }
    res.status(200).json(book)
  } catch (error) {
    res.status(400).json(error)
  }
}

// DELETE a book
//-----------------------------------------------------------------------
const deleteBook = async (req, res) => {
  // Check if the passed id is a valid mongoDb type
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "No such book in db" })
  }

  // Check if user is owner of book item
  try {
    const book = await Book.findById(req.params.id)
    const userId = req.user._id.toString()
    if (userId != book.user.toString()) {
      return res.status(400).json({ error: "Not your book to delete" })
    }
  } catch (error) {
    res.status(400).json(error)
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    if (!deletedBook) {
      return res.status(400).json({ error: "No such workout in db" })
    }
    res.status(200).json(deletedBook)
  } catch (error) {
    res.status(400).json(error)
  }
}

//UPDATE a book
//-----------------------------------------------------------------------
const updateBook = async (req, res) => {
  // Check if user is owner of book item
  try {
    const book = await Book.findById(req.params.id)
    const userId = req.user._id.toString()
    if (userId != book.user.toString()) {
      return res.status(400).json({ error: "Not your book to update" })
    }
  } catch (error) {
    res.status(400).json(error)
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    res.status(200).json(updatedBook)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { getAllBooks, createNewBook, getSingleBook, deleteBook, updateBook }
