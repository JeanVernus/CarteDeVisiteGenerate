import React from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Switch, NavLink, Route, } from 'react-router-dom';
import './CSS/App.scss';
import logo from './Logo.png';

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <div>
            <NavLink exact to="/" className="Link" activeClassName="current"></NavLink>
            <NavLink to="/Register" className="floatHeader1" activeClassName="current">Enregistrement</NavLink>
          </div>
          <img className="logo" src={logo} alt="logo" />
          <h1> Bienvenue</h1>
          <div>
            <NavLink to="/login" className="floatHeader2" activeClassName="current">Connexion</NavLink>
          </div>
        </header>
        <div>
          <Switch>
            <Route path="/Register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
