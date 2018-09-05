import { gql } from 'apollo-boost'

// User queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`

// Recipe queries
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