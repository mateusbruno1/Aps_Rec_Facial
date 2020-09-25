import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Cadastro from './pages/cadastro';
  import Landing from './pages/landing';
  import Login from './pages/login';
  import Home from './pages/home';

export default function Routes() {
  return(
      <Router>
          <Switch>
            <Route path="/" exact>
                <Landing />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/cadastro" exact>
                <Cadastro />
            </Route>
        </Switch>
      </Router>
  );
}