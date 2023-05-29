import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../../context/UserContext"
import Spinner from "../Spinner/Spinner"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submittedEmpty, setSubmittedEmpty] = useState(false)

  const { isLoading, error, login } = useContext(UserContext)

  const emailInputRef = useRef()
  useEffect(() => {
    emailInputRef.current.focus()
  }, [])

  // Handle submit login
  //---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setSubmittedEmpty(true)
      return
    }

    login({ email, password })

    setEmail("")
    setPassword("")
    setSubmittedEmpty(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="signup" id="login-form">
        <h2>Log in</h2>

        {submittedEmpty && <div className="error">Enter all fields</div>}

        {!submittedEmpty && error && <div className="error">{error}</div>}

        <label htmlFor="login-email">Email</label>
        <input
          type="text"
          name="email"
          id="login-email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          ref={emailInputRef}
        ></input>

        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          name="password"
          id="login-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Log in"}
        </button>
      </form>
    </div>
  )
}

export default Login
