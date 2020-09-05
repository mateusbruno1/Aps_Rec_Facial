import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Login from './pages/login';
  import Home from './pages/home';

export default function Routes() {
  return(
      <Router>
          <Switch>
            <Route path="/" exact>
                <Login />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
        </Switch>
      </Router>
  );
}