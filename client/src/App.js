import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Navbar from './Navbar'
import PrivateRoute from './auth/PrivateRoute'


const App = () => {
  return (
    <div>
      <Router>
      		<header>
      				<Navbar />
      		</header>
      		<Switch>
      			<PrivateRoute exact path="/" component={Home} />
      			<Route exact path="/signup" component={Signup} />
      			<Route exact path="/login" component={Login} />      		
          </Switch>
      </Router>
  </div>
  );
}

export default App