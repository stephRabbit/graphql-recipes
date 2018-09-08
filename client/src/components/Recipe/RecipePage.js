import React from 'react'
import { Query } from 'react-apollo'
//import { withRouter } from 'react-router-dom'
import { GET_RECIPE } from '../../queries'

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US')
  const newTime = new Date(date).toLocaleTimeString('en-US')
  return `${newDate} at ${newTime}`
}

const RecipePage = ({ match }) => {
  const { _id } = match.params
  return (
    <div className="App">
      <Query
        query={GET_RECIPE}
        variables={{ _id, }}
      >
        {({ data, loading, error, }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error</div>
          console.log('GET_RECIPE ', data)
          const { category, createdDate, description, instructions, name, likes, username, } = data.getRecipe
          return (
            <div className="App">
              <h2>{name}</h2>
              <p>Category: {category}</p>
              <p>Description: {description}</p>
              <p>Instructions: {instructions}</p>
              <p>Created By: {username}</p>
              <p>Created Date: {formatDate(createdDate)}</p>
              <p>Likes: {likes}</p>
              <button>Like</button>
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default RecipePage
