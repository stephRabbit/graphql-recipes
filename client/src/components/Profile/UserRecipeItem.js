import React from 'react'
import { Link } from 'react-router-dom'

const UserRecipeItem = ({ _id, name, likes}) => (
  <li>
    <p><Link to={`/recipe/${_id}`}>{name}</Link></p>
    <p>Likes: {likes}</p>
  </li>
)

export default UserRecipeItem
