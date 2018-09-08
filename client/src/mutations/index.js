import { gql } from 'apollo-boost'

// Recipe mutations
export const ADD_RECIPE = gql`
  mutation(
    $name: String!,
    $category: String!,
    $description: String!,
    $instructions: String!,
    $username: String!
  ) {
    addRecipe(
      name: $name,
      category: $category,
      description: $description,
      instructions: $instructions,
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`


// User mutations
export const SIGN_IN_USER = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`

export const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`