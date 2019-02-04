import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBTooltip, MDBRow, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import {Link} from "react-router-dom";
import ReactTable from "react-table";
import './Providers.css'
import 'react-table/react-table.css';
import {getProviders, deleteProvider} from './ProviderFunctions';



class ProvidersTable extends Component {
    state = {
        columns : [
            {
                Header: <h5>Empresa</h5>,
                accessor: 'company',
            },
            {
                Header: <h5>Direccion</h5>,
                accessor: 'address'
            },
            {
                Header: <h5>Contacto</h5>,
                accessor: 'contact'
            },
            {
                Header: <h5>Celular</h5>,
                accessor: 'mobile'
            },
            {
                Header: <h5>Email</h5>,
                accessor: 'email'
            },
            {
                Header: <h5>Telefono</h5>,
                accessor: 'phone'
            },
        ],
        selected: null,
        selectedId: '',
        data: [],
        openModal: false,
        isSelected: false
      };

      toggleModal = () => {
        this.setState({
            openModal : !this.state.openModal
        })}

      componentDidMount(){
         this.getProviders();
        }

        getProviders = () => {
            getProviders().then((res) => {
                console.log('Providers', res.data.allProviders);
                this.setState({
                    data : res.data.allProviders
                })
            }).catch((err) => {
                console.log(err);
            });
        }

        deleteProvider = () => {
            const selected = this.state.selected;
            const data = this.state.data;
            if (typeof data[selected] !== 'undefined'){
                const id =  data[selected]._id;

                deleteProvider(id).then((res)=>{
                    console.log('Deleted!', res);
                    this.getProviders();
                })
                .catch((err)=>{
                    console.log(err);
                });
            } else {
                this.setState({
                    openModal : true 
                });
            }    
        }

    render() {
        let {columns, data} = this.state
        return (
            <div className="container mt-3">

                <div className="d-flex justify-content-between">
                    <h2 className="mt-3">Proveedores</h2>
                    <MDBRow>
                        <Link to={'/providers/new'}>
                            <MDBTooltip
                                placement="top"
                                tooltipContent="Nuevo">
                                    <MDBBtn color="mdb-color" >
                                    <MDBIcon icon="plus"  className="mr-1" />
                                </MDBBtn>
                            </MDBTooltip>
                        </Link>

                        <MDBTooltip
                            placement="top"
                            tooltipContent="Refrescar">
                                <MDBBtn onClick={this.getProviders} color="cyan" >
                                    <MDBIcon icon="sync"  className="mr-1" />
                                </MDBBtn>
                        </MDBTooltip>

                        <Link to={this.state.isSelected ? `/providers/edit/${this.state.selectedId}` : '/providers/new'}>
                        <MDBTooltip
                            placement="top"
                            tooltipContent="Editar">
                                <MDBBtn color="blue-grey" >
                                    <MDBIcon icon="edit"  className="mr-1" />
                                </MDBBtn>
                        </MDBTooltip>
                        </Link>
                        

                        <MDBTooltip
                            placement="top"
                            tooltipContent="Eliminar">
                                <MDBBtn onClick={this.deleteProvider} color="brown" >
                                    <MDBIcon icon="trash"  className="mr-1" />
                                </MDBBtn>
                        </MDBTooltip>

                    </MDBRow>  
                </div>
            
                    <ReactTable   
                        defaultPageSize={10}
                        className="-striped -highlight"
                        columns={columns} 
                        data={data}
                        filterable = {true}
                        
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                            return {
                                onClick : (e) => {

                                this.setState({
                                    selected: rowInfo.index,
                                    selectedId: rowInfo.original._id,
                                    isSelected: true
                                })
                                console.log(rowInfo.original);
                                },
                                style: {
                                background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                            }
                            } else {
                            return {}
                        }}}/>

                    <MDBModal modalStyle='warning' isOpen={this.state.openModal} toggle={this.toggleModal} centered>
                        <MDBModalHeader titleClass="w-100 font-weight-bolder" toggle={this.toggleModal}>Escoja un Proveedor</MDBModalHeader>
                            <MDBModalBody className="text-center">
                                <MDBIcon className="amber-text" icon="exclamation-circle" size="5x"/>
                            </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn onClick={this.toggleModal} color='warning'>Ok</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
            </div>
        );
    }
}

export default ProvidersTable;