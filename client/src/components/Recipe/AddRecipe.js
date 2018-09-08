import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { ADD_RECIPE } from '../../mutations'
import { GET_ALL_RECIPES } from '../../queries';
import Errors from '../Errors'

const initialState = {
  name: '',
  category: 'Breakfast',
  description: '',
  instructions: '',
}

class AddRecipe extends Component {
  state = {
    ...initialState,
    username: '',
  }

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      this.setState(() => ({ username: this.props.session.getCurrentUser.username }))
    }
  }

  clearState = () => {
    this.setState(() => ({ ...initialState, }))
  }

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState(() => ({ [name]: value, }))
  }

  handleSubmit = addRecipe => e => {
    e.preventDefault()
    addRecipe().then(async ({ data }) => {
      console.log('addRecipe ', data)
      this.clearState()
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { name, category, description, instructions, } = this.state
    const isInvalid = !name || !category || !description || !instructions
    return isInvalid
  }

  /**
   * @param { object } cache - query data in cache
   * @param { object } data - new data
   */
  updateCache = (cache, { data: { addRecipe } }) => {
    // Get cache query
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES, })

    // Update cache with new data
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [ addRecipe, ...getAllRecipes ],
      },
    })
  }

  render() {
    const { name, category, description, instructions, username, } = this.state
    return (
      <div className="App">
        <h2>Add Recipe</h2>
        <Mutation
          mutation={ADD_RECIPE}
          variables={{ name, category, description, instructions, username }}
          update={this.updateCache}
        >
          {
           /**
            * @param {function} addRecipe - mutate function
            * @param {object} mutation result containing:
            * { data, called, loading, error }
            */
          }
          {(addRecipe, { data, loading, error, }) => {
            const disabledStatus = loading || this.validateForm()
            return (
              <form
                className="form"
                onSubmit={this.handleSubmit(addRecipe)}
              >
                <input
                  name="name"
                  onChange={this.handleInputChange}
                  placeholder="Recipe name"
                  type="text"
                  value={name}
                />
                <select
                  name="category"
                  onChange={this.handleInputChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  name="description"
                  onChange={this.handleInputChange}
                  placeholder="Add description..."
                  type="text"
                  value={description}
                />
                <textarea
                  name="instructions"
                  onChange={this.handleInputChange}
                  placeholder="Add instructions..."
                  type="text"
                  value={instructions}
                ></textarea>
                <button
                  className={disabledStatus ? 'button-primary disabled-button' : 'button-primary'}
                  disabled={disabledStatus}
                >
                  Submit
                </button>
                {error && <Errors error={error} />}
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(AddRecipe)
