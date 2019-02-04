import React, { Component } from 'react';
import { MDBBtn, 
        MDBCard,
        MDBCardBody, 
        MDBRow, 
        MDBCol, 
        MDBContainer, 
        MDBIcon, 
        MDBModal, 
        MDBModalHeader,
        MDBModalBody,
        MDBModalFooter} from "mdbreact";

import {Link} from "react-router-dom";
import {saveProvider, editProvider, selectProvider} from './ProviderFunctions';


class NewProvider extends Component {

    state = {
        openModal : false,
        modalStyle: {},
        selectedId: null,
        selectedProvider : {}
    }

    modalSuccessStyle = {
        icon: 'check-circle',
        title: 'Guardado con Exito',
        style: 'success',
        iconColor: 'green-text',
    }
    modalErrorStyle = {
        icon: 'times-circle',
        title: 'Error del Servidor',
        style: 'danger',
        iconColor: 'red-text',
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
                this.setState({
                    openModal: true,
                    modalStyle: this.modalSuccessStyle,
                });
            },(err)=>{
                console.log(err);
                this.setState({
                    openModal: true,
                    modalStyle: this.modalErrorStyle,
                });
    
            });
        } else {
            saveProvider(provider).then((res)=>{
                console.log('Saved', res);
                this.setState({
                    openModal: true,
                    modalStyle: this.modalSuccessStyle,
                });
            },(err)=>{
                console.log(err);
                this.setState({
                    openModal: true,
                    modalStyle: this.modalErrorStyle,
                });
            });
        }
    }
        

    toggleModal = () => {
        this.setState({
            openModal : !this.state.openModal
        })
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
                                        <Link to="/providers"><MDBBtn type="reset" color="dark"> Cancelar</MDBBtn></Link>
                                    </MDBRow>
                                    
                                </form>
                            </MDBCardBody>  
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                <MDBModal modalStyle={this.state.modalStyle.style} isOpen={this.state.openModal} toggle={this.toggleModal} centered>
                    <MDBModalHeader titleClass="w-100 font-weight-bolder" toggle={this.toggleModal}>{this.state.modalStyle.title}</MDBModalHeader>
                    <MDBModalBody className="text-center">
                        <MDBIcon className={this.state.modalStyle.iconColor} icon={this.state.modalStyle.icon} size="5x"/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <Link to="/providers"><MDBBtn color={this.state.modalStyle.style}>Ok</MDBBtn></Link>
                    </MDBModalFooter>
                </MDBModal>

            </MDBContainer>
        );
    }
}

export default NewProvider;