import React, {useEffect, useState} from 'react';
import api from './services/api';
import {
    BrowserRouter as Router,
    useHistory,
    Switch,
    Redirect,
    Route,
    Link
  } from "react-router-dom";
  import Cadastro from './pages/cadastro';
  import Landing from './pages/landing';
  import Login from './pages/login';
  import HomePacient from './pages/homePacient';
  import HomeMedic from './pages/homeMedic';
  import AuthCheck from './pages/authCheck';

  const Routes = () => {
  let auth =  JSON.parse(localStorage.getItem('@Auth'));
  if(!auth){
    auth = {
      token: false,
      medic:false,
    }
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      auth.token ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    )}/>
  )

  return(
    <Router history={useHistory}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/home" component={auth.medic === 'true' ? HomeMedic : HomePacient} />
          <Route path="/login" component={Login} exact />
          <Route path="/cadastro" component={Cadastro} exact />
          <Route path="/auth" component={AuthCheck} exact />
      </Switch>
    </Router>
  )
}

export default Routes;
