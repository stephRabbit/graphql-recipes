const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}

exports.resolvers = {
  Query: {
    /**
     * @param {*} - root (parent)
     * @param {*} - args { ...args }
     * @param {*} - context { ...Model }
     */
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find()

      return allRecipes
    }
  },

  Mutation: {
    /**
     * @param {*} - root (parent)
     * @param {*} - args { ...args }
     * @param {*} - context { ...Model }
     */
    addRecipe: async (root, {
      name,
      category,
      description,
      instructions,
      username
    }, { Recipe }) => {
      const newRecipe = await new Recipe({
        name,
        category,
        description,
        instructions,
        username,
      })
      .save()

      return newRecipe
    },

    signupUser: async (root, {
      username,
      email,
      password,
    }, { User }) => {
      const user = await User.findOne({ username })

      if (user) {
        throw new Error('User already exist')
      }

      const newUser = await new User({
        username,
        email,
        password,
      })
      .save()

      return {
        token: createToken(newUser, process.env.SECRET, '1hr')
      }
    }
  }
}