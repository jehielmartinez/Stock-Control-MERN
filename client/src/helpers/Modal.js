import React, { Component } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import {Link} from 'react-router-dom';

class Modal extends Component {
   
    render() {
        return (
            <MDBModal modalStyle={this.props.modalStyle.style} isOpen={this.props.openModal} toggle={this.props.toggleModal} centered>
            <MDBModalHeader titleClass="w-100 font-weight-bolder" toggle={this.props.toggleModal}>{this.props.modalStyle.title}</MDBModalHeader>
            <MDBModalBody className="text-center">
                <MDBIcon className={this.props.modalStyle.iconColor} icon={this.props.modalStyle.icon} size="5x"/>
            </MDBModalBody>
            <MDBModalFooter>
                <Link to={this.props.modalStyle.link}><MDBBtn color={this.props.modalStyle.style}>Ok</MDBBtn></Link>
            </MDBModalFooter>
        </MDBModal>
        );
    }
}

export default Modal;
