import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import CKEditor from 'react-ckeditor-component'

import { ADD_RECIPE } from '../../mutations'
import { GET_ALL_RECIPES, GET_USER_RECIPES, } from '../../queries';
import Errors from '../Errors'
import withAuth from '../../hoc/withAuth'

const initialState = {
  name: '',
  imageUrl: '',
  category: 'Breakfast',
  description: '',
  instructions: '',
  username: '',
}

class AddRecipe extends Component {
  state = {
    ...initialState,
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

  handleEditorChange = e => {
    const instructions = e.editor.getData()
    this.setState(() => ({ instructions }))
  }

  handleSubmit = addRecipe => e => {
    e.preventDefault()
    addRecipe().then(async ({ data }) => {
      this.clearState()
      this.props.history.push('/')
    })
  }

  validateForm = () => {
    const { name, imageUrl, category, description, instructions, } = this.state
    const isInvalid = !name || !imageUrl ||!category || !description || !instructions
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
    const { name, imageUrl, category, description, instructions, username, } = this.state
    return (
      <div className="App">
        <h2>Add Recipe</h2>
        <Mutation
          mutation={ADD_RECIPE}
          refetchQueries={() => [
            { query: GET_USER_RECIPES, variables: { username }, },
          ]}
          variables={{ name, imageUrl, category, description, instructions, username }}
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
                <input
                  name="imageUrl"
                  onChange={this.handleInputChange}
                  placeholder="Recipe image"
                  type="text"
                  value={imageUrl}
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
                {/* <textarea
                  name="instructions"
                  onChange={this.handleInputChange}
                  placeholder="Add instructions..."
                  type="text"
                  value={instructions}
                ></textarea> */}
                <label htmlFor="instructions">Add Instructions</label>
                <CKEditor
                  name="instructions"
                  content={instructions}
                  events={{ change: this.handleEditorChange }}
                />
                <br />
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

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddRecipe)
)
