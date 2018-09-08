import React from 'react'
import { Redirect, } from 'react-router-dom'
import { Query, } from 'react-apollo'

import { GET_CURRENT_USER } from '../queries'
/**
 * withAuth
 * @param { function } conditonFn - evalute session
 * @return <Component {...props}> - if logged in
 * @return <Redirect> - if logged out
 */
const withAuth = conditonFn => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {
     /**
      * @param {object} query - result containing:
      * { data, called, loading, error }
      */
    }
    {({ data, loading, refetch, }) => {
      if (loading) return null

      return conditonFn(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }}
  </Query>
)

export default withAuth