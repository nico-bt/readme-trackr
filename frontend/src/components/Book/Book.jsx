import { useContext, useState } from "react"
import { BookContext } from "../../context/BookContext"
import EditForm from "../EditForm/EditForm"
import "./Book.css"
import DeleteIcon from "../../assets/DeleteIcon"
import EditIcon from "../../assets/EditIcon"
import Checkbox from "../../assets/Checkbox"
import Menubook from "../../assets/Menubook"

function Book({ book }) {
  const { dispatch } = useContext(BookContext)
  const [showEditForm, setShowEditForm] = useState(false)

  const deleteBook = async () => {
    const response = await fetch("/api/books/" + book._id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: book._id })
    }
  }

  const handleClick = async () => {
    const response = await fetch("/api/books/" + book._id, {
      method: "PATCH",
      body: JSON.stringify({ readComplete: !book.readComplete }),
      headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
      const updatedBook = { ...book, readComplete: !book.readComplete }
      dispatch({ type: "TOOGLE_READ_STATUS", payload: updatedBook })
    }
  }

  return (
    <>
      <div key={book._id} className="card">
        <div className="space-between">
          <div className="card-title">
            <DeleteIcon className="card-delete-btn" onClick={deleteBook} />
            <EditIcon className="card-edit-btn" onClick={() => setShowEditForm(true)} />
            {book.title}
          </div>

          <div className="card-body">
            <p>{book.author}</p>
            <hr></hr>
            <p className="readMarker" onClick={handleClick}>
              {book.readComplete ? (
                <>
                  <span>Done</span>
                  <Checkbox className="green" />
                </>
              ) : (
                <>
                  <span>Unread</span>
                  <Menubook className="red" />
                </>
              )}
            </p>
          </div>
        </div>

        <div className="card-footer">
          {book.link ? (
            <a href={book.link} target="_blank" rel="noreferrer">
              Book Link
            </a>
          ) : (
            "-"
          )}
        </div>
      </div>

      {showEditForm && <EditForm bookToEdit={book} setShowEditForm={setShowEditForm} />}
    </>
  )
}

export default Book
