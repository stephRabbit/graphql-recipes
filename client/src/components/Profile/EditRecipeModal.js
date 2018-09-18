import React from 'react'
import { Mutation } from 'react-apollo'

import { UPDATE_USER_RECIPE } from '../../mutations'

const EditRecipeModal = ({
  recipe,
  handleCloseModal,
  handleInputChange,
  handleSubmit,
}) => (
  <Mutation
    mutation={UPDATE_USER_RECIPE}
    variables={{
      _id: recipe._id,
      name: recipe.name,
      imageUrl: recipe.imageUrl,
      category: recipe.category,
      description: recipe.description,
    }}
  >
    {updateUserRecipe => {
      return (
        <div className="modal modal-open">
          <div className="modal-inner">
            <div className="modal-content">
              <form
                className="modal-content-inner"
                onSubmit={handleSubmit(updateUserRecipe)}
              >
                <h4>Edit Recipe</h4>
                <input
                  name="name"
                  onChange={handleInputChange}
                  type="text"
                  value={recipe.name}
                />
                <input
                  name="imageUrl"
                  onChange={handleInputChange}
                  type="text"
                  value={recipe.imageUrl}
                />
                <select
                  name="category"
                  onChange={handleInputChange}
                  value={recipe.category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  name="description"
                  onChange={handleInputChange}
                  type="text"
                  value={recipe.description}
                />
                <hr />
                <div className="modal-buttons">
                  <button
                    className="button-primary"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCloseModal}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }}
  </Mutation>
)

export default EditRecipeModal
