import { useContext, useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import "./userAuth.css"
import { UserContext } from "../../context/UserContext"

function UserAuth() {
  const [showSignup, setShowSignup] = useState(true)
  const { resetError } = useContext(UserContext)

  return (
    <>
      {!showSignup && (
        <>
          <Login />
          <div className="signup">
            <p>
              Don't have an account?{" "}
              <button
                className="between-signup-login lighter"
                onClick={() => {
                  resetError()
                  setShowSignup(true)
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </>
      )}

      {showSignup && (
        <>
          <Signup />
          <div className="signup">
            <p>
              Already have an account?{" "}
              <button
                className="between-signup-login lighter"
                onClick={() => {
                  resetError()
                  setShowSignup(false)
                }}
              >
                Log in
              </button>
            </p>
          </div>
        </>
      )}
    </>
  )
}

export default UserAuth
