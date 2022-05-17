import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Cadastrar from './pages/Cadastrar';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cadastrar" component={Cadastrar} />
        </Switch>
      </Router>
      
    </div>
  );
}


