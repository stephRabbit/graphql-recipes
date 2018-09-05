const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}

exports.resolvers = {
  Query: {
    /**
     * @param {*} - root (parent)
     * @param {object} - args { ...args }
     * @param {object} - context { ...Model }
     */
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find()

      return allRecipes
    }
  },

  Mutation: {
    /**
     * @param {object} - root { previous object }
     * @param {object} - args { ...args }
     * @param {object} - context Model { Recipe }
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

    /**
     * @param {object} - root { previous object }
     * @param {object} - args { ...args }
     * @param {object} - context Model { User }
     */
    signInUser: async (root, {
      username,
      password
    }, { User }) => {
      const user = await User.findOne({ username })

      if (!user) {
        throw new Error('Sorry, user not found!')
      }

      // Compare user input password user password from DB
      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        throw new Error('Invalid password!')
      }

      return {
        token: createToken(user, process.env.SECRET, '1hr')
      }
    },

    signUpUser: async (root, {
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