import "./App.css"
import { useContext, useEffect, useState } from "react"
import BookList from "./components/BookList/BookList"
import EmptyListMessage from "./components/EmptyListMessage/EmptyListMessage"
import Form from "./components/Form/Form"
import UserAuth from "./components/UserAuth/UserAuth"
import { UserContext } from "./context/UserContext"
import Navbar from "./components/Navbar/Navbar"
import { BookContext } from "./context/BookContext"

function App() {
  const [showForm, setShowForm] = useState(false)

  const { user, error, isLoading } = useContext(UserContext)

  const {
    books,
    getAllBooks,
    error: getBooksError,
    isLoading: loadingBooks,
  } = useContext(BookContext)

  // Fetch data
  useEffect(() => {
    getAllBooks()
  }, [user])

  return (
    <>
      <Navbar setShowForm={setShowForm} />

      {!user && !isLoading && <UserAuth />}

      {user && (
        <>
          {books.length === 0 && (
            <EmptyListMessage error={getBooksError} isLoading={loadingBooks} />
          )}
          <BookList books={books} />
          {showForm && <Form setShowForm={setShowForm} />}
        </>
      )}
    </>
  )
}

export default App
