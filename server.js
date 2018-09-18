const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' })

const PORT = process.env.PORT || 4444

// bring in GraphQL middleware
const { ApolloServer } = require('apollo-server-express')

// graphql
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

// models
const Recipe = require('./models/Recipe')
const User = require('./models/User')

// connect to db (add these lines)
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('DB connected')
  })
  .catch(err => {
    console.log('Error on start: ', err.stack)
    process.exit(1)
  })

// initialize your app
const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))

// set up JWT authentication middleware
app.use((req, res, next) => {
  const token = req.headers.authorization
  if (token !== 'null') {
    try {
      req.currentUser = jwt.verify(token, process.env.SECRET)
    }
    catch (err) {
      console.error(err)
    }
  }
  next()
})

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    Recipe,
    User,
    currentUser: req.currentUser,
  })
})

server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})