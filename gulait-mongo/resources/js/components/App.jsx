import React from 'react';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import '../font-awesome';
import GetCoords from '../components/pages/GetCoords';
 
const App = () => {
    return ( 
        <Router >
            {/* <NavigationBar></NavigationBar> */}
            <Switch>
                <Route path='/signup' component={ SignUp } ></Route>
                <Route path='/getcoords' component={ GetCoords } ></Route>
                <Route path='/home' component={ Home } ></Route>
                <Route path='/' component={ Home } ></Route>
            </Switch>
        </Router> 
    );
}

export default App;
