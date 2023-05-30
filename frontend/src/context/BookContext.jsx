import { useReducer } from "react"
import { createContext } from "react"

// Create a global state, available for all components/pages
// and keep in sync the db with local data --> [books]

export const BookContext = createContext()

export const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_BOOKS_BEGIN":
      return {
        ...state,
        isLoading: true,
        error: false,
      }

    case "SET_ALL_BOOKS":
      return {
        ...state,
        isLoading: false,
        error: false,
        books: action.payload,
      }

    case "SET_ALL_BOOKS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case "CREATE_BOOK":
      return {
        ...state,
        books: [action.payload, ...state.books],
      }
    case "DELETE_BOOK":
      return {
        // get the id as payload and filter actual state
        ...state,
        books: state.books.filter((item) => item._id !== action.payload),
      }
    case "EDIT_BOOK":
      return {
        // Update book object with payload if match id
        ...state,
        books: state.books.map((item) => (item._id !== action.payload._id ? item : action.payload)),
      }
    case "TOOGLE_READ_STATUS":
      return {
        // get the id as payload and toogle .teadComplete if match id
        ...state,
        books: state.books.map((item) => (item._id !== action.payload._id ? item : action.payload)),
      }
    default:
      return state
  }
}

export function BookContextProvider({ children }) {
  const initialState = {
    books: [],
    isLoading: true,
    error: null,
  }
  const [state, dispatch] = useReducer(booksReducer, initialState) //useReducer(reducer, state)

  const getAllBooks = async () => {
    dispatch({ type: "SET_ALL_BOOKS_BEGIN" })
    try {
      const response = await fetch("/api/books")
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: "SET_ALL_BOOKS", payload: data })
      } else {
        // setIsLoading(false)
      }
    } catch (err) {
      dispatch({ type: "SET_ALL_BOOKS_ERROR", payload: err })
    }
  }

  return (
    <BookContext.Provider value={{ ...state, dispatch, getAllBooks }}>
      {children}
    </BookContext.Provider>
  )
}
