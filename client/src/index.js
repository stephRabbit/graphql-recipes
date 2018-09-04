import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import './index.css'
import Routes from './routes/Routes'

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
)
