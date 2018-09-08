import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from '../components/App'
import NavBar from '../components/Nav/NavBar';
import AddRecipe from '../components/Recipe/AddRecipe'
import RecipePage from '../components/Recipe/RecipePage'
import Profile from '../components/Profile/Profiile'
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
          <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
          <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
          <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
          <Route path="/recipe/:_id" component={RecipePage} />
          <Route path="/profile" render={() => <Profile session={session}/>} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    </Router>
  )
}

export default Root
