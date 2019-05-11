import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import MenuBelt from './../genericos/menu';

export default class AltaUsuario extends React.Component {
  state = {
    logger: {
      isAuth: null
    }
}

  /* Llenar el modelo del usuario */
  handleChange = event => {
    this.setState(
        {
            ...this.state,
            [event.target.name]: event.target.value
        }
    );
}

async componentDidMount(){
  const dataFetch = await axios.get('http://localhost:3002/Belt/users/auth', {withCredentials: true})
  console.log("data: ", dataFetch)
   await this.setState({logger: dataFetch.data})
   console.log("logger",this.state.logger.isAuth)
}

/* Metodo clic */
handleSubmit = event =>{
  event.preventDefault()
  let validaPass = this.state.password === this.state.passConfirm ? true:false;
 
  if(validaPass){
    const nuevoUsuario={
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password 
  }
  //Metoto axios para registrar 
  axios({
    method: 'post',
    baseURL: 'http://localhost:3002/Belt/users/save',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    data: nuevoUsuario
    }).then(res => {
    if(res.data.success===true){
      console.log(res.data.message);  
    }else{
        console.log(res.data.error);
    }
})

  }else{
    //render mini modal 
    console.log("pass no coinciden")
  }
   
}
  render() {
    console.log(this.state.logger)
    if(this.state.logger.isAuth){
    return (
     <div>
         <MenuBelt />  
      <Form onSubmit={this.handleSubmit} >
      <Row form>
          <Col md={8}>
            <FormGroup>
              <Label for="nombre">*Nombre</Label>
              <Input type="text" 
                     name="name"
                     required
                     maxLength="100"
                    onChange = {(e) => this.handleChange(e)}/>
            </FormGroup>
          </Col>
          <Col md={8}>
            <FormGroup>
              <Label for="lastname">*Apeidos</Label>
              <Input type="text" 
                     name="lastname"
                     required
                     onChange = {(e) => this.handleChange(e)} />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="">*Email</Label>
              <Input type="email" 
                     name="email" 
                     required
                     onChange = {(e) => this.handleChange(e)}/>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
        <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">*Password</Label>
              <Input type="password" 
                     name="password"
                     required
                     onChange = {(e) => this.handleChange(e)} />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Label for="examplePassword">*Vuelva a escribir el pass</Label>
              <Input type="password" 
                     name="passConfirm"
                     required
                     onChange = {(e) => this.handleChange(e)}/>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
         <FormGroup check >
          <Input type="checkbox" name="role"/>
          <Label for="exampleCheck" 
                 check 
                 value ="1"
                 onChange = {(e) => this.handleChange(e)}>Administrador</Label>
         </FormGroup>
        </Row>

        <Row form>
           <Button type="submit" color="primary">Enviar </Button>
        </Row>
        
      </Form>
      </div> 
    );
  }else{
    return(
      <div>
         <MenuBelt />  
         <h1> no tienes permisos para entrar al menu</h1>
      </div>
    );
  }
 }
}

