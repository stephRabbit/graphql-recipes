exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String!
    imageUrl: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Query {
    # @return Recipe[] - all
    getAllRecipes: [Recipe]

    # @params {ID} - required
    # @return Recipe - by _id
    getRecipe(_id: ID!): Recipe

    # @return Recipe[] - by searchTerm
    searchRecipes(searchTerm: String): [Recipe]

    # @return User - logged in or null
    getCurrentUser: User

    # @return Recipe[] - by username
    getUserRecipes(username: String!): [Recipe]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addRecipe(
      name: String!,
      imageUrl: String!,
      category: String!,
      description: String!,
      instructions: String!,
      username: String!
    ): Recipe

    likeRecipe(_id: ID!, username: String!): Recipe

    unlikeRecipe(_id: ID!, username: String!): Recipe

    updateUserRecipe(
      _id: ID!,
      name: String!,
      imageUrl: String!,
      category: String!,
      description: String!
    ): Recipe

    deleteUserRecipe(_id: ID!): Recipe

    signInUser(username: String!, password: String!):Token

    signUpUser(
      username: String!,
      email: String!,
      password: String!
    ): Token
  }
`