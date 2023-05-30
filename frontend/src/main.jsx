import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { UserContextProvider } from "./context/UserContext.jsx"
import { BookContextProvider } from "./context/BookContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BookContextProvider>
      <App />
    </BookContextProvider>
  </UserContextProvider>
)
