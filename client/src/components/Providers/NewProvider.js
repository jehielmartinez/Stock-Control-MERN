import React, { Component } from 'react';
import { MDBBtn, 
        MDBCard,
        MDBCardBody, 
        MDBRow, 
        MDBCol, 
        MDBContainer, 
        MDBIcon} from "mdbreact";

import {Link} from "react-router-dom";
import {saveProvider, editProvider, selectProvider} from './ProviderFunctions';
import swal from 'sweetalert2';

class NewProvider extends Component {

    state = {
        selectedId: null,
        selectedProvider : {}
    }

    companyRef = React.createRef();
    addressRef = React.createRef();
    contactRef = React.createRef();
    mobileRef = React.createRef();
    emailRef = React.createRef();
    phoneRef = React.createRef();

    componentDidMount(){
        selectProvider(this.props.match.params.id).then((response)=>{
            this.setState({
                selectedId: this.props.match.params.id,
                selectedProvider: response.data.provider
            });
        },(err)=>{
            console.log(err);
        })    
    }

    saveProvider = (e) => {
        e.preventDefault();

        const provider = {
          company  : this.companyRef.current.value,
          address : this.addressRef.current.value,
          contact : this.contactRef.current.value,
          mobile : this.mobileRef.current.value,
          email : this.emailRef.current.value,
          phone : this.phoneRef.current.value
        }

        if (this.state.selectedId) {
            editProvider(provider, this.state.selectedId).then((res)=>{
                console.log('Updated', res);
                swal.fire({
                    title:'Proveedor Guardado!',
                    type: 'success',
                    text: res.data.company,
                    confirmButtonText: 'Ok'
                }).then(()=>{
                    this.props.history.push('/providers');
                }); 

            },(err)=>{
                console.log(err);
                swal.fire({
                    title:'Error!',
                    type: 'error',
                    text: 'Error del Servidor',
                    confirmButtonText: 'Ok'
                });
            });

        } else {
            saveProvider(provider).then((res)=>{
                console.log('Saved', res);
                swal.fire({
                    title:'Proveedor Guardado!',
                    type: 'success',
                    text: res.data.company,
                    confirmButtonText: 'Ok'
                }).then(()=>{
                    this.props.history.push('/providers');
                });

            },(err)=>{
                console.log(err);
                swal.fire({
                    title:'Error!',
                    type: 'error',
                    text: 'Error del Servidor',
                    confirmButtonText: 'Ok'
                }); 
            });
        };
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow center className="mt-5">
                    <MDBCol md="8">
                        <MDBCard>
                            <MDBCardBody>
                                <h3 className="text-center"> Proveedor</h3>

                                <form autoComplete="off" onSubmit={this.saveProvider} className="grey-text">

                                    <div className="form-group">
                                        <label><MDBIcon icon="industry" size=""/> Empresa</label>
                                        <input  defaultValue={this.state.selectedProvider.company} ref={this.companyRef} type="text" className="form-control"/>
                                    </div>

                                    <div className="form-group">
                                        <label><MDBIcon icon="map-marked-alt"/> Direccion</label>
                                        <input defaultValue={this.state.selectedProvider.address}  ref={this.addressRef} type="text" className="form-control"/>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label><MDBIcon icon="user" size=""/> Contacto</label>
                                            <input defaultValue={this.state.selectedProvider.contact}  ref={this.contactRef} type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label><MDBIcon icon="mobile-alt" size=""/> Celular</label>
                                            <input defaultValue={this.state.selectedProvider.mobile} ref={this.mobileRef} type="tel" className="form-control"/>
                                        </div> 
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label><MDBIcon icon="at" size=""/> Email</label>
                                            <input defaultValue={this.state.selectedProvider.email} ref={this.emailRef} type="email" className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label><MDBIcon icon="phone" size=""/> Telefono</label>
                                            <input defaultValue={this.state.selectedProvider.phone} ref={this.phoneRef} type="tel" className="form-control"/>
                                        </div> 
                                    </div>
                                    

                                    <MDBRow center className="mt-3">
                                        <MDBBtn type="submit" color="mdb-color"> Guardar</MDBBtn>
                                        <Link to="/providers"><MDBBtn type="reset" color="dark"> Volver</MDBBtn></Link>
                                    </MDBRow>
                                    
                                </form>
                            </MDBCardBody>  
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                
            </MDBContainer>
        );
    }
}

export default NewProvider;