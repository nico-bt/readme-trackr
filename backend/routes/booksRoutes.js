const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Book = require("../models/BookModel")

// Controllers
const {
  getAllBooks,
  createNewBook,
  getSingleBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookControllers")

// GET all books | endpoint: /api/books/
router.get("/", getAllBooks)

// CREATE a New book | endpoint: /api/books/
router.post("/", createNewBook)

// Get a SINGLE book | endpoint: /api/books/:id
router.get("/:id", getSingleBook)

// Update a book | endpoint: /api/books/:id
router.patch("/:id", updateBook)

// Delete a book | endpoint: /api/books/:id
router.delete("/:id", deleteBook)

module.exports = router
