import React from 'react'
import { withRouter } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo'

const handleSignOut = (client, history) => () => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push('/')
}

const Signout = ({ history }) => {
  return (
    <ApolloConsumer>
      {client => {
        console.log('ApolloConsumer: ', client)
        return (<button onClick={handleSignOut(client, history)}>Sign out</button>)
      }}
    </ApolloConsumer>
  )
}

export default withRouter(Signout)
