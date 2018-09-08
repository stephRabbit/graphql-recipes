import React from 'react'
import { Link } from 'react-router-dom'

const SearchResultItem = ({ _id, name, likes, }) => (
  <li>
    <h3>
      <Link to={`/recipe/${_id}`}>{name}</Link>
    </h3>
    <p><strong>Likes: {likes}</strong></p>
  </li>
)

export default SearchResultItem
