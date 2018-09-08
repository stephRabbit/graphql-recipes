import React from 'react'
import { Query, } from 'react-apollo'

import { GET_CURRENT_USER } from '../queries'

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {
     /**
      * @param {object} query - result containing:
      * { data, called, loading, error }
      */
    }
    {({ data, loading, refetch, }) => {
      if (loading) return null
      return (
        <Component
          {...props}
          refetch={refetch}
          session={data}
        />
      )
    }}
  </Query>
)

export default withSession
