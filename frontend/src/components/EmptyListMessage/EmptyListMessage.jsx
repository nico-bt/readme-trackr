import React from "react"
import "./EmptyListMessage.css"

function EmptyListMessage({ error, isLoading }) {
  return (
    <div className="empty-list">
      <div>
        {isLoading && <p>Loading...</p>}

        {!isLoading && error && (
          <>
            <p>Something went wrong accessing the database.</p>
            <p>Please try again later</p>
          </>
        )}

        {!isLoading && !error && (
          <>
            <p>Your list is empty</p>
            <p>Add a new book to read</p>
          </>
        )}
      </div>
    </div>
  )
}

export default EmptyListMessage
