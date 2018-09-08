import React from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { DELETE_USER_RECIPE } from '../../mutations'
import { GET_USER_RECIPES, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries'

const handleDeleteUserRecipe = deleteUserRecipe => () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this recipe?')

  if (confirmDelete) {
    deleteUserRecipe().then(async ({ data }) => {})
  }
}

/**
 * @param { object } cache - query data in cache
 * @param { object } data - new data
 * @param { string } username - need for intial query (GET_USER_RECIPES)
 */
const updateCache = username => (cache, { data: { deleteUserRecipe, } }) => {
  // Get cache query
  const { getUserRecipes } = cache.readQuery({
    query: GET_USER_RECIPES,
    variables: { username },
  })

  // Update cache with new data
  cache.writeQuery({
    query: GET_USER_RECIPES,
    variables: { username },
    data: {
      getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id),
    },
  })
}

const UserRecipeItem = ({ _id, name, likes, username, }) => (
  <li>
    <p><Link to={`/recipe/${_id}`}>{name}</Link></p>
    <p>Likes: {likes}</p>
    <Mutation
      mutation={DELETE_USER_RECIPE}
      refetchQueries={() => [
        { query: GET_ALL_RECIPES },
        { query: GET_CURRENT_USER },
      ]}
      variables={{ _id, }}
      update={updateCache(username)}
    >
      {(deleteUserRecipe, attrs = {}) => {
        return (
          <p
            className="delete-button"
            onClick={handleDeleteUserRecipe(deleteUserRecipe)}
          >

            {attrs.loading ? 'Deleting...' : 'X'}
          </p>
        )
      }}
    </Mutation>
  </li>
)

export default UserRecipeItem
