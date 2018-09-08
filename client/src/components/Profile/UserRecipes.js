import React from 'react'
import { Query } from 'react-apollo'

import { GET_USER_RECIPES } from '../../queries'
import UserRecipesItem from '../../components/Profile/UserRecipeItem'

const UserRecipes = ({ username, }) => (
  <Query
    query={GET_USER_RECIPES}
    variables={{ username }}
  >
    {({ data, loading, error, }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error</div>
      console.log('UserRecipes: ', data)
      return (
        <div>
          <h3>Your Recipes</h3>
          <ul>
            {data.getUserRecipes.map(recipe => <UserRecipesItem key={recipe._id} {...recipe} username={username} />)}
          </ul>
        </div>
      )
    }}
  </Query>
)

export default UserRecipes
