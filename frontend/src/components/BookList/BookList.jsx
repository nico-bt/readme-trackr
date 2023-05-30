import Book from "../Book/Book"
import "./BookList.css"

function BookList({ books }) {
  return (
    <div className="container">
      {books.map((book) => (
        <Book key={book._id} book={book} />
      ))}
    </div>
  )
}

export default BookList
