import React from 'react'
import { Query } from 'react-apollo'

import { GET_RECIPE } from '../../queries'
import LikeRecipe from './LikeRecipe'
import Spinner from '../Spinner'

const RecipePage = ({ match }) => {
  const { _id } = match.params
  return (
    <div className="App">
      <Query
        query={GET_RECIPE}
        variables={{ _id, }}
      >
        {({ data, loading, error, }) => {
          if (loading) return <Spinner />
          if (error) return <div>Error</div>
          const { category, description, instructions, name, likes, username, imageUrl, } = data.getRecipe
          return (
            <div className="App">
              <div className="recipe-image" style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}></div>
              <div className="recipe">
                <div className="recipe-header">
                  <h2 className="recipe-name">
                    <strong>{name}</strong>
                  </h2>
                  <h5>
                    <strong>{category}</strong>
                  </h5>
                  <p>Created by: <strong>{username}</strong></p>
                  <p>{likes} <span role="img" aria-label="heart">❤️</span></p>
                </div>
              </div>
              <blockquote className="recipe-description">
                {description}
              </blockquote>
              <h3 className="recipe-instructions__title">Instructions</h3>
              <div
                className="recipe-instructions"
                dangerouslySetInnerHTML={{__html: instructions}}
              />
              <LikeRecipe _id={_id} />
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default RecipePage
