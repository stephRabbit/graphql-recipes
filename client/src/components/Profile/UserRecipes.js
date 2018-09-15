import React from 'react'
import { Query } from 'react-apollo'

import { GET_USER_RECIPES } from '../../queries'
import UserRecipesItem from '../../components/Profile/UserRecipeItem'
import Spinner from '../Spinner'

const UserRecipes = ({ username, }) => (
  <Query
    query={GET_USER_RECIPES}
    variables={{ username }}
  >
    {({ data, loading, error, }) => {
      if (loading) return <Spinner />
      if (error) return <div>Error</div>
      return (
        <div>
          <h3>Your Recipes</h3>
          {!data.getUserRecipes.length ? (
            <p>You have not added any repices.</p>
          ) : (
            <ul>
              {data.getUserRecipes.map(recipe => <UserRecipesItem key={recipe._id} {...recipe} username={username} />)}
            </ul>
          )}
        </div>
      )
    }}
  </Query>
)

export default UserRecipes
