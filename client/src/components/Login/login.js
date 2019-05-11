import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

//Botones 
import { Button, Form,FormGroup, Input } from 'reactstrap';

///ellementos GRAL 
import PIE from './../genericos/pie';
//estilo 
import './../../css/generales/appbar.css';

//datos prueba pass contraSegura123
class login extends React.Component{
    state = {
        datos :null,
        redirectToHome:false
    }

    handleSubmit = event =>{
        event.preventDefault()
        const user={
            email: this.state.email,
            password: this.state.password
        } 

       /*  const dataFetch =  axios.get('http://localhost:3002/Belt/clients/find/Akron')
        this.setState({datos: dataFetch.data}) */
        axios({
            method: 'post',
            baseURL: 'http://localhost:3002/Belt/users/login',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            data: user
        })
        .then(res => {
            console.log(res.data)
            if(res.data.loginSuccess===true){
                this.setState({redirectToHome: true})
            }else{
                alert("error de credenciales");
            }
        })
    }
    handleChange = event => {
        this.setState(
            {
                ...this.state,
                [event.target.name]: event.target.value
            }
        );
    }
    render(){
        if(this.state.redirectToHome) {return <Redirect to="/home"/>}
        return(
            <div>
                <header >
                 <div className="header">
                   <div className="logo">Belt</div>
                 </div>  
                </header>

                <div className="row justify-content-center align-items-center bottom:50" >
                <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <Form action="" autoComplete="off" onSubmit={this.handleSubmit}>
                            <FormGroup className="form-group">
                             <Input type="text" required
                                    name="email" 
                                    placeholder="alguien@dominio.com"
                                    onChange = {(e) => this.handleChange(e)} /> 
                            </FormGroup>
                            
                            <FormGroup className="form-group">
                                <Input required type="password" 
                                       name="password" 
                                       onChange = {(e) => this.handleChange(e)} />
                            </FormGroup>

                            <FormGroup className="form-group">
                               <Button type="submit" color="primary">Enviar </Button>
                            </FormGroup>

                        </Form>
                      </div>
                    </div>
                  </div>
                </div>

                <PIE />
                </div>
        )
    }
}

export default login;