import { gql } from 'apollo-boost'

import { recipeFragments } from '../queries/fragments'

// Recipe mutations
export const ADD_RECIPE = gql`
  mutation(
    $name: String!,
    $imageUrl: String!,
    $category: String!,
    $description: String!,
    $instructions: String!,
    $username: String!
  ) {
    addRecipe(
      name: $name,
      imageUrl: $imageUrl,
      category: $category,
      description: $description,
      instructions: $instructions,
      username: $username
    ) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`

export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      ...LikeRecipe
    }
  }
  ${recipeFragments.like}
`

export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      ...LikeRecipe
    }
  }
  ${recipeFragments.like}
`

export const UPDATE_USER_RECIPE = gql`
  mutation(
    $_id: ID!
    $name: String!,
    $imageUrl: String!,
    $category: String!,
    $description: String!
  ) {
    updateUserRecipe(
      _id: $_id,
      name: $name,
      imageUrl: $imageUrl,
      category: $category,
      description: $description
    ) {
      _id
      name
      imageUrl
      category
      description
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