import "./App.css"
import { useContext, useEffect, useState } from "react"
// import BookList from "./components/BookList/BookList"
// import EmptyListMessage from "./components/EmptyListMessage/EmptyListMessage"
// import Form from "./components/Form/Form"
// import Navbar from "./components/Navbar/Navbar"
import UserAuth from "./components/UserAuth/UserAuth"
import { UserContext } from "./context/UserContext"
// import { BookContext } from "./context/BookContext"

function App() {
  const [showForm, setShowForm] = useState(false)
  // const { books, dispatch } = useContext(BookContext)

  // Check if user is logged in
  const { user, error, isLoading } = useContext(UserContext)
  console.log(user)

  // // Fetch data
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await fetch("/api/books")
  //       if (response.ok) {
  //         const data = await response.json()
  //         dispatch({ type: "SET_ALL_BOOKS", payload: data })
  //         setError(false)
  //         setIsLoading(false)
  //       } else {
  //         setIsLoading(false)
  //       }
  //     } catch (err) {
  //       setError(true)
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchBooks()
  // }, [dispatch, user])

  return (
    <div>
      {/* <Navbar setShowForm={setShowForm} user={user} setUser={setUser} /> */}

      {!user && !isLoading && <UserAuth />}

      {user && <h1>Logged in!</h1>}

      {/* {user && (
        <>
          {books.length === 0 && <EmptyListMessage error={error} isLoading={isLoading} />}
          <BookList books={books} />
          {showForm && <Form setShowForm={setShowForm} />}
        </>
      )} */}
    </div>
  )
}

export default App
