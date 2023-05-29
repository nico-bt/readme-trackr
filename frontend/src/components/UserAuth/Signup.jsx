import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { UserContext } from "../../context/UserContext"
import Spinner from "../Spinner/Spinner"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submittedEmpty, setSubmittedEmpty] = useState(false)
  const [defaultBooks, setDefaultBooks] = useState("yes")

  const { isLoading, error, signup } = useContext(UserContext)

  const emailInputRef = useRef()
  useEffect(() => {
    emailInputRef.current.focus()
  }, [])

  // Handle submit signup
  //---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setSubmittedEmpty(true)
      return
    }

    signup({ email, password, defaultBooks })

    setEmail("")
    setPassword("")
    setSubmittedEmpty(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="signup" id="signup-form">
        <h2>Sign up</h2>

        {submittedEmpty && <div className="error">Enter all fields</div>}

        {!submittedEmpty && error && <div className="error">{error}</div>}

        <label htmlFor="signup-email">Email</label>
        <input
          type="text"
          name="email"
          id="signup-email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          ref={emailInputRef}
        ></input>

        <label htmlFor="signup-password">Password</label>
        <input
          type="password"
          name="password"
          id="signup-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label style={{ marginBottom: "10px" }}>Add some recomendations to read?</label>
        <div className="default-books-input">
          <label htmlFor="yes">Yes, add books</label>
          <input
            type="radio"
            name="add-defaults"
            id="yes"
            value="yes"
            checked={defaultBooks === "yes"}
            onChange={(e) => {
              setDefaultBooks(e.target.value)
            }}
          />
        </div>
        <div className="default-books-input">
          <label htmlFor="no">No, start empty</label>
          <input
            type="radio"
            name="add-defaults"
            id="no"
            value="no"
            checked={defaultBooks === "no"}
            onChange={(e) => {
              setDefaultBooks(e.target.value)
            }}
          />
        </div>

        <button className="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Sign up"}
        </button>
      </form>
    </div>
  )
}

export default Signup
