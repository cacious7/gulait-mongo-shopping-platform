import React from 'react';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

const App = () => {
    return ( 
        <Router>
            <Navbar></Navbar>
            <Switch>
                <Route path='/signup' component={ SignUp }></Route>
                <Route path='/home' component={ Home } ></Route>
                <Route path='/' component={ Home } ></Route>
            </Switch>
        </Router> 
    );
}

export default App;
