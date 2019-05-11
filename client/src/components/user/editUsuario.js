import React from 'react';   
import { Col, Row, Button, Form, FormGroup, Label, Input, Collapse,Alert } from 'reactstrap';
import axios from 'axios';
import MenuBelt from './../genericos/menu';
import modalMensajes from './../modals/modal';

export default class editUsuario extends React.Component {
    state = {
        datos :null,
        verDetalle:false,
        nameEdit:null,
        userBuscado:null
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
handleChangeSearch = event =>{
  this.setState({
    nameEdit: event.target.value
  })
}

/*Cambio de password */
handleCambioPassword = event =>{
  this.setState({confirmPassword:true,
        password:event.target.value})
}
handelCambioSelect = event =>{
  console.log('select list ',event);
}
async componentDidMount(){
  const dataFetch = await axios.get('http://localhost:3002/Belt/users/find/')
  this.setState({datos: dataFetch.data})
}

/* Metodo clic Buscar */
handleBuscar = event =>{
  event.preventDefault();
  const resultado = this.state.datos.find( user  => user.email === this.state.nameEdit );
  this.setState({
    userBuscado:resultado,
    verDetalle:true});
  }
/* Metodo clic para aplicar cambio  */
handleAplicarCambios = event =>{
  event.preventDefault();
  const cambioUsuario={
    name: this.state.userBuscado.name,
    lastname: this.state.userBuscado.lastname,
    email: this.state.userBuscado.email,
    password: this.state.password,
    role: this.state.role
  }
  let realiza = true ;
  if(this.state.confirmPassword){
    if(this.state.password !== this.state.passConfirm){
      console.log("pass incorrect ");
       realiza= false;
    }
  }
  if(realiza){
    console.log(cambioUsuario)
  }
}

  render() {
    const datalist = this.state.userBuscado ? this.state.userBuscado : [];
    console.log(datalist);
    return (
     <div>
         <MenuBelt />  
    
    <Form onSubmit={this.handleBuscar} >
      <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="email">*Email</Label>
              <Input type="text" 
                     name="nameEdit"
                     required
                     maxLength="100"
                     onChange = {(e) => this.handleChangeSearch(e)}/>
            </FormGroup>
          </Col>
      </Row>

      <Row form>
        <Col md={4}>
          <FormGroup>
              <Button type="submit" color="primary">Buscar</Button>
              </FormGroup>
        </Col>
      </Row>
      </Form>
     
    <Collapse isOpen={this.state.verDetalle}>
    <form name="Detalle" onSubmit={this.handleAplicarCambios}  >
    <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="nombre">*Nombre</Label>
              <Input type="text" 
                     name="name"
                     required
                     maxLength="100"
                     placeholder={datalist.name}
                     disabled
                     onChange = {(e) => this.handleChange(e)}/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="lastname">*Apeidos</Label>
              <Input type="text" 
                     name="lastname"
                     required     
                     placeholder={datalist.lastname}           
                     onChange = {(e) => this.handleChange(e)} />
            </FormGroup>
          </Col>
          </Row>
        
      
        <Row form>
          <Col md={8}>
            <FormGroup>
              <Label for="">*Email</Label>
              <Input type="email" 
                     name="email" 
                     required 
                     placeholder={datalist.email}
                     onChange = {(e) => this.handleChange(e)}/>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={3}>
          <FormGroup>
            <Label for=""> Perfil</Label>
            <Input type="select" name="role" 
                   onChange = {(e) => this.handelCambioSelect(e)}>
              <option value={0}>Usuario</option>
              <option value={1}>Administrador </option>
            </Input>
          </FormGroup>
          </Col>

          <Col md={3}>
          <FormGroup>
            <Label for="">*Estatus</Label>
            <Input type="select">
              <option value="1">Activo</option>
              <option value="0">In Activo </option>
            </Input>
          </FormGroup>
          </Col>
        </Row>

        <Row form>
        <Col md={4}>
            <FormGroup>
              <Label for="password">*Password</Label>
              <Input type="password" 
                     name="password"
                     required
                     onChange = {(e) => this.handleCambioPassword(e)} />
            </FormGroup>
          </Col>
        </Row>
        <Alert color="danger">This is a danger alert — check it out!</Alert>
        <Collapse isOpen={this.state.confirmPassword}>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="repetpassword">*Vuelva a escribir el pass</Label>
              <Input type="password" 
                     name="passConfirm"
                     onChange = {(e) => this.handleChange(e)}/>
            </FormGroup>
          </Col>
        </Row>
      </Collapse>

      <Row form>
        <Col md={4}>
          <FormGroup>
              <Button type="submit" color="primary">Enviar</Button>
              </FormGroup>
        </Col>
      </Row>

    </form>
 </Collapse>
      </div> 
    );
  }
}