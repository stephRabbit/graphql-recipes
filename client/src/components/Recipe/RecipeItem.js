import React from 'react'
import { Link } from 'react-router-dom'

const RecipeItem = ({ _id, name, category, }) => (
  <li>
    <h3>
      <Link to={`/recipe/${_id}`}>{name}</Link>
    </h3>
    <p><strong>{category}</strong></p>
  </li>
)

export default RecipeItem

