import React from 'react'

import NavBarAuth from './NavBarAuth'
import NavBarUnAuth from './NavBarUnAuth'

const NavBar = ({ session }) => {
  console.log(session && session.getCurrentUser)
  return (
    <nav>
      {session && session.getCurrentUser
        ? <NavBarAuth session={session}/>
        : <NavBarUnAuth />
      }
    </nav>
  )
}

export default NavBar
