import { createContext, useEffect, useState } from "react"

const baseURL = "http://localhost:4000/api"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in
  //-----------------------------------------
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
      setError(false)
      try {
        const response = await fetch(`${baseURL}/user`)
        if (response.ok) {
          const user = await response.json()
          if (user) {
            setUser(user)
          }
        }
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  // Signup
  //-----------------------------------------
  const signup = async ({ email, password, defaultBooks }) => {
    try {
      const response = await fetch(`${baseURL}/user/signup`, {
        method: "POST",
        body: JSON.stringify({ email, password, defaultBooks }),
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        const user = await response.json()
        if (user) {
          setError(false)
          setUser(user)
        }
      } else {
        const json = await response.json()
        return json.error
      }
    } catch (err) {
      setError(err)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Login
  //-----------------------------------------
  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        const user = await response.json()
        if (user) {
          setError(false)
          setUser(user)
        }
      } else {
        const json = await response.json()
        // setError(json.error)
        return json.error
      }
    } catch (err) {
      setError(err)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Reset error
  //-----------------------------------------
  const resetError = () => {
    setError(false)
  }

  // Logout
  //-----------------------------------------
  const logout = async () => {
    // Send request to server to delete cookie and local state user set to null
    try {
      const response = await fetch(`${baseURL}/user/logout`)
      if (response.ok) {
        setUser(null)
        // dispatch({ type: "SET_ALL_BOOKS", payload: [] })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <UserContext.Provider value={{ user, isLoading, error, signup, login, logout, resetError }}>
      {children}
    </UserContext.Provider>
  )
}
