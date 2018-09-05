import { gql } from 'apollo-boost'

// User queries
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`

// Recipe queries