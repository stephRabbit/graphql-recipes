import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from '../components/App'
import NavBar from '../components/Nav/NavBar';
import AddRecipe from '../components/Recipe/AddRecipe';
import Profile from '../components/Profile/Profiile';
import Search from '../components/Recipe/Search'
import SignIn from '../components/Auth/SignIn'
import SignUp from '../components/Auth/SignUp'

const Root = ({ refetch, session, }) => {
  return (
    <Router>
      <Fragment>
        <NavBar session={session} />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/search" component={Search} />
          <Route path="/recipe/add" component={AddRecipe} />
          <Route path="/profile" component={Profile} />
          <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
          <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    </Router>
  )
}

export default Root
