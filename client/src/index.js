import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import './index.css'
import Root from './routes/Root'
import withSession from './hoc/withSession'

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    // Send token to BE
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token')
    // Add token to "authorization" header
    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      // console.log('Network Error ', networkError)
      if (networkError) {
        localStorage.removeItem('token')
      }
    }
  },
})

/**
 * withSession
 * @param {*} Component - pass currentUser to all components
 */
const RootWithSession = withSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
)
