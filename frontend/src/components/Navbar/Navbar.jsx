import { useContext } from "react"
import "./Navbar.css"
// import { BookContext } from "../../context/BookContext"
import { UserContext } from "../../context/UserContext"

function Navbar({ setShowForm }) {
  const { user, logout } = useContext(UserContext)
  //   const { dispatch } = useContext(BookContext)

  const handleclickLogout = async () => {
    logout()
  }

  return (
    <div className="navbar">
      <div>
        {/* {!user && <button className='navbar_button'>Sign up</button>} */}
        <h1>My Reading List</h1>
        {user && (
          <button className="navbar_button logout-btn" onClick={handleclickLogout}>
            Log out
          </button>
        )}
      </div>
      <div>{user && <div>Welcome {user.email}</div>}</div>
      <div>
        {user && (
          <button className="navbar_new-book-button" onClick={() => setShowForm(true)}>
            Add a New Book
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
