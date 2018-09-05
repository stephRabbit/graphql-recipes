const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')

require('dotenv').config({ path: 'variables.env' })

// Import models
const Recipe = require('./models/Recipe')
const User = require('./models/User')

// Import GraphQL-Expess middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// Schema and resolvers GraphQL
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Connect to Mongo DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, })
  .then(() => console.log('DB connected...'))
  .catch(err => console.error('Failed to connect to DB: ', err))

// Initialize app
const app = express()

// Enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

app.use(cors(corsOptions))

// Set up JWT middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization']

  // Check to make sure token is not a string of null
  if (token !== 'null') {
    try {
      // Verify token and pass it to GraphQL middleware
      const currentUser = await jwt.verify(token, process.env.SECRET)
      req.currentUser = currentUser
    }
    catch (err) {
      console.error(err)
    }
  }

  next()
})

// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql', }))

// Connect schemas with GraphQL
app.use('/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser, }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser,
    },
  }))
)

const PORT = process.env.PORT || 4444

app.listen(PORT, () => console.log('Server listening on PORT: ', PORT))