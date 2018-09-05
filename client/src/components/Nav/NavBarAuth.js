import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const NavBarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/recipe/add">Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <button>Sign out</button>
      </li>
    </ul>
    <p>Welcome, <strong>{session.getCurrentUser.username}</strong></p>
  </Fragment>
)

export default NavBarAuth