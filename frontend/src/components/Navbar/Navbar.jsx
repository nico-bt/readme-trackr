import { useContext } from "react"
import "./Navbar.css"
// import { BookContext } from "../../context/BookContext"
import { UserContext } from "../../context/UserContext"
import LogoutIcon from "../../assets/LogoutIcon"

function Navbar({ setShowForm }) {
  const { user, logout } = useContext(UserContext)
  //   const { dispatch } = useContext(BookContext)

  const handleclickLogout = async () => {
    logout()
  }

  return (
    <div className="navbar">
      <div className="title-and-logout-div">
        <h1>My Reading List</h1>
        {user && (
          <button className="navbar_button logout-btn" onClick={handleclickLogout}>
            <LogoutIcon />
            <span>Log out</span>
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
