import React from 'react';
import {Route, Switch} from 'react-router';
import {Login,RegistUser,Home} from './pages'; 

const Router = () => {
  return (
    <Switch>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Regist" component={RegistUser}/>
      <Route exact path="(/)?" component={Home}/>
    </Switch>
  )
}

export default Router;