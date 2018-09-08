const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email, }, secret, { expiresIn, })
}

exports.resolvers = {
  Query: {
    /**
     * @param {object} - root { previous object(parent value) }
     * @param {object} - args { ...args }
     * @param {object} - context { ...Model }
     */
    getAllRecipes: async (root, args, { Recipe, }) => {
      const allRecipes = await Recipe.find().sort({ createdDate: 'desc', })

      return allRecipes
    },

    getRecipe: async (root, { _id, }, { Recipe, }) => {
      const recipe = await Recipe.findOne({ _id, })
      return recipe
    },

    searchRecipes: async (root, { searchTerm, }, { Recipe, }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find({
          // Find according to 'text' search
          $text: {
            $search: searchTerm,
          }
        }, {
          // Add new field on Recipe coming back
          score: { $meta: 'textScore' },
        })
        .sort({
          // Sort by textScore to get the best result
          score: { $meta: 'textScore' },
        })

        return searchResults
      }
      else {
        const recipes = await Recipe.find().sort({
          likes: 'desc',
          createdDate: 'desc',
        })

        return recipes
      }
    },

    getCurrentUser: async (root, args, { currentUser, User, }) => {
      if (!currentUser) return null

      const user = await User.findOne({ username: currentUser.username, })
        // Inject Recipe model in favorites[]
        .populate({
          path: 'favorites',
          model: 'Recipe',
        })

      return user
    },

    getUserRecipes: async (root, { username, }, { Recipe, }) => {
      const userRecipes = await Recipe.find({ username }).sort({ createdDate: 'desc', })

      return userRecipes
    },
  },

  Mutation: {
    /**
     * @param {object} - root { previous object(parent value) }
     * @param {object} - args { ...args }
     * @param {object} - context Model { Recipe }
     */
    addRecipe: async (root, {
      name,
      category,
      description,
      instructions,
      username,
    }, { Recipe, }) => {
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
      password,
    }, { User, }) => {
      const user = await User.findOne({ username, })

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
    }, { User, }) => {
      const user = await User.findOne({ username, })

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