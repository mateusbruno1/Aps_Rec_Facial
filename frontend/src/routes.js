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

  const Routes = () => {

  const [authenticated, setAuth] = useState(true);
  const [isMedic, setMedic] = useState(false);
  const [isAdm, setAdm] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('@auth');

    if (auth) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(auth.token)}`;
      setAuth(true);
      setMedic(auth.user.medic);
      setAdm(auth.user.provider);
    }
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      authenticated ? (
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
          <PrivateRoute path="/home" component={isMedic ? HomeMedic : HomePacient} />
          <Route path="/login" component={Login} exact />
          <Route path="/cadastro" component={Cadastro} exact />
      </Switch>
    </Router>
  )
}

export default Routes;
