import React from 'react'
import { Link } from 'react-router-dom'

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US')
  const newTime = new Date(date).toLocaleTimeString('en-US')
  return `${newDate} at ${newTime}`
}

const UserInfo = ({ session }) => {
  // DEBUG console.log('UserInfo: ', session)
  const { username, email, joinDate, favorites } = session.getCurrentUser
  return (
    <div>
      <h3>User Info</h3>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Member Since: {formatDate(joinDate)}</p>
      <div>
        <h3>{username}'s Favorites</h3>
        {!favorites.length ? (
          <p>
            You have no favorites currently.{' '}
            <strong>Add recipe you like!</strong>
          </p>
        ) : (
          <ul>
            {favorites.map(favorite => (
              <li key={favorite._id}>
                <p>
                  <Link to={`/recipe/${favorite._id}`}>
                    {favorite.name}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserInfo
