import React from 'react'

import NavBarAuth from './NavBarAuth'
import NavBarUnAuth from './NavBarUnAuth'

const NavBar = ({ session }) => {
  return (
    <nav>
      {session && session.getCurrentUser ? (
        <NavBarAuth session={session} />
      ) : (
        <NavBarUnAuth />
      )}
    </nav>
  )
}

export default NavBar
