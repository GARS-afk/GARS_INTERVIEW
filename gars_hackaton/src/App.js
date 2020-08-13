import React from 'react';
import './App.css';

//Dependecias
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

//Componentes exportados
import Home from './Containers/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Router>
  )
}

export default App;
