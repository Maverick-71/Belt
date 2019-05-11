import React, { Component } from 'react';
import  { Switch, Route } from 'react-router-dom';

//importacion de mis rutas
import Login from './components/Login/login';
import Home from './components/Home/home';
import NuevoUsuario from './components/user/nuevoUsuario';
import EditUser from './components/user/editUsuario';

class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/home" exact component={Home} />
                    <Route path="/newUsuario" exact component={NuevoUsuario}/>
                    <Route path="/edituser" exact component={EditUser}/>
                </Switch>
            </div>
        );
    }
}

export default Routes;