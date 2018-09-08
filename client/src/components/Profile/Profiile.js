import React from 'react'

import UserInfo from './UserInfo'
import UserRecipes from './UserRecipes'

const Profiile = ({ session }) => {
  return (
    <div className="App">
      <UserInfo session={session} />
      <UserRecipes username={session.getCurrentUser.username} />
    </div>
  )
}

export default Profiile
