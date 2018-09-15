import React from 'react'
import { Link } from 'react-router-dom'
import posed from 'react-pose'

const RecipeItem = posed.li({
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0,
  },
})

export default ({ _id, imageUrl, name, category, }) => (
  <RecipeItem
    className="card"
    style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
  >
    <span className={category}>
      {category}
    </span>
    <div className="card-text">
      <h3>
        <Link to={`/recipe/${_id}`}>{name}</Link>
      </h3>
    </div>
  </RecipeItem>
)

