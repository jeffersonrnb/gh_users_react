import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from '../pages/app/app'
import UsersPage from '../pages/users/users'
import UserDetailsPage from '../pages/users/user_details'

export default function Routers() {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={({ match }) => <App match={match} />}
      />
      <Route
        exact
        path='/users'
        render={({ match }) => <UsersPage match={match} />}
      />
      <Route
        exact
        path='/users/:username'
        render={({ match }) => <UserDetailsPage match={match} />}
      />
    </Switch>
  )
}
