import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class MenuAppBelt extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.verClientes = this.verClientes.bind(this);

    this.state = {
      dropdownOpen: false,
      dropdownClientes: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  verClientes(){
    this.setState({
      dropdownClientes: !this.state.dropdownClientes
    });
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink href="#" >Inicio</NavLink>
          </NavItem>

          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Usuario
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem ><Link to="/newUsuario" >Nuevo</Link></DropdownItem>
              <DropdownItem ><Link to="/edituser" >Modificar</Link></DropdownItem>
              <DropdownItem>Cambiar Contraseña</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown nav isOpen={this.state.dropdownClientes} toggle={this.verClientes}>
            <DropdownToggle nav caret>
              Clientes
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem >Nuevo Cliente</DropdownItem>
              <DropdownItem >Modificar Cliente</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavItem>
            <NavLink href="#">Cotizacion</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}