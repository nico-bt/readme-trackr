import { useContext, useEffect, useRef, useState } from "react"
import { BookContext } from "../../context/BookContext"
import "./Form.css"
import CloseIcon from "../../assets/CloseIcon.jsx"

function Form({ setShowForm }) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [link, setLink] = useState("")
  const [submittedEmpty, setSubmittedEmpty] = useState(false)
  const { dispatch } = useContext(BookContext)

  const titleInputRef = useRef()

  useEffect(() => {
    titleInputRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !author) {
      setSubmittedEmpty(true)
      return
    }
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify({ title, author, link }),
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        setTitle("")
        setAuthor("")
        setLink("")
        setSubmittedEmpty(false)
        setShowForm(false)

        const newBook = await response.json()
        dispatch({ type: "CREATE_BOOK", payload: newBook })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="form-container">
      <form className="form-control" onSubmit={handleSubmit}>
        <CloseIcon className="close-btn" onClick={() => setShowForm(false)} />

        {submittedEmpty && <div className="error-empty-msg">Please enter Title and Author</div>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          className={submittedEmpty && !title ? "error" : ""}
          ref={titleInputRef}
        ></input>

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value)
          }}
          className={submittedEmpty && !author ? "error" : ""}
        ></input>

        <input
          type="text"
          placeholder="Optional link - https://amazon.com/your-book"
          value={link}
          onChange={(e) => {
            setLink(e.target.value)
          }}
        ></input>

        <button type="submit" className="submit-btn">
          Add Book
        </button>
      </form>
    </div>
  )
}

export default Form
