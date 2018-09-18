import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'

import { DELETE_USER_RECIPE } from '../../mutations'
import {
  GET_USER_RECIPES,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
} from '../../queries'
import Spinner from '../Spinner'
import EditRecipeModal from './EditRecipeModal'

class UserRecipes extends Component {
  state = {
    _id: '',
    category: '',
    description: '',
    imageUrl: '',
    modal: false,
    name: '',
  }

  handleCloseModal = () => {
    this.setState(() => ({ modal: false }))
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState(() => ({ [name]: value, }))
  }

  handleDeleteUserRecipe = deleteUserRecipe => () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?')

    if (confirmDelete) {
      deleteUserRecipe().then(async ({ data }) => { })
    }
  }

  handleSubmit = updateUserRecipe => e => {
    e.preventDefault()

    updateUserRecipe().then(({ data }) => {
      console.log(data)
      this.handleCloseModal()
    })
  }

  loadRecipe = recipe => () => {
    this.setState(() => ({
      ...recipe,
      modal: true
    }))
    console.log(recipe)
  }

  /**
   * @param { object } cache - query data in cache
   * @param { object } data - new data
   * @param { string } username - need for intial query (GET_USER_RECIPES)
   */
  updateCache = username => (cache, { data: { deleteUserRecipe, } }) => {
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

  render() {
    const { modal, } = this.state
    const { username, } = this.props

    return (
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
                <div>
                  {modal && (
                    <EditRecipeModal
                      handleCloseModal={this.handleCloseModal}
                      handleInputChange={this.handleInputChange}
                      handleSubmit={this.handleSubmit}
                      recipe={this.state}
                    />
                  )}
                  <ul>
                    {data.getUserRecipes.map(recipe => {
                      const { _id, name, likes, username, } = recipe
                      return (
                        <li key={_id}>
                          <p><Link to={`/recipe/${_id}`}>{name}</Link></p>
                          <p>Likes: {likes}</p>
                          <Mutation
                            mutation={DELETE_USER_RECIPE}
                            refetchQueries={() => [
                              { query: GET_ALL_RECIPES },
                              { query: GET_CURRENT_USER },
                            ]}
                            variables={{ _id, }}
                            update={this.updateCache(username)}
                          >
                            {(deleteUserRecipe, attrs = {}) => (
                              <div>
                                <button
                                  className="button-primary"
                                  onClick={this.loadRecipe(recipe)}
                                >
                                  Update
                                </button>
                                <p
                                  className="delete-button"
                                  onClick={this.handleDeleteUserRecipe(deleteUserRecipe)}
                                >

                                  {attrs.loading ? 'Deleting...' : 'X'}
                                </p>
                              </div>
                            )}
                          </Mutation>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default UserRecipes
