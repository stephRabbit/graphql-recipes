import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from '../components/App'
import SignIn from '../components/Auth/SignIn'
import SignUp from '../components/Auth/SignUp'

const Root = ({ refetch }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
        <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default Root
