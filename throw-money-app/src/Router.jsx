import React from 'react'
import { Route, Switch } from 'react-router'
import { Login, RegistUser, Dashboard, Home } from './pages'
import Auth from './Auth'

const Router = () => {
  console.log('Routerコンポーネント')
  return (
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/RegistUser" component={RegistUser} />

      <Auth>
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="(/)?" component={Home} />
      </Auth>
    </Switch>
  )
}

export default Router
