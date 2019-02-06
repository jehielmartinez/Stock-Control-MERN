import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdownToggle, 
  MDBDropdownMenu, 
  MDBDropdownItem,
  MDBIcon,
  MDBDropdown
} from "mdbreact";
import './Sidenav.css';


class Sidenav extends Component {
  state = {
    isOpen: false,
    tableTitle: ''
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <MDBNavbar color="elegant-color" dark expand="md">
            <MDBNavbarBrand>
              <h3 className="white-text"> Control de Inventarios</h3>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav right>

                    <MDBNavItem>
                    <MDBNavLink to="/inventory">Existencias</MDBNavLink>
                    </MDBNavItem>

                    <MDBNavItem>
                    <MDBNavLink to="/">Transacciones</MDBNavLink>
                    </MDBNavItem>

                    <MDBNavItem>
                    <MDBNavLink to="/providers">Proveedores</MDBNavLink>
                    </MDBNavItem>
  
                    <MDBNavItem>
                      <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                          <MDBIcon icon="user" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default" right>
                          <MDBDropdownItem><h5>Jehiel Martinez</h5></MDBDropdownItem>
                          <MDBDropdownItem >Perfil de Usuario</MDBDropdownItem>
                          <MDBDropdownItem >Cerrar Sesion</MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavItem>

                </MDBNavbarNav>
            </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Sidenav;
