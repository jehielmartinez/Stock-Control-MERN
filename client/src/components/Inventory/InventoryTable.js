import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBTooltip, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import swal from 'sweetalert2';
import './Inventory.css';
import {getItems, deleteItem} from './InventoryFunctions';

class InventoryTable extends Component {
    state = {
        columns : [
            {
                Header: <h5>Descripcion</h5>,
                accessor: 'description',
            },
            {
                Header: <h5>Proveedor</h5>,
                accessor: 'provider'
            },
            {
                Header: <h5>Unidades</h5>,
                accessor: 'units'
            },
            {
                Header: <h5>Tipo</h5>,
                accessor: 'type'
            },
            {
                Header: <h5>Existencia</h5>,
                accessor: 'stock'
            },
            {
                Header: <h5>Porcentaje</h5>,
                accessor: 'percentage'
            },
        ],
        selected: null,
        selectedId: '',
        data: [],
        isSelected: false
      };

      componentDidMount(){
          this.getInventory();
      }

      getInventory = () => {
        getItems().then((response)=>{
            console.log(response.data.items);
            this.setState({
                data : response.data.items,
                isSelected: false
            });
        },(err)=>{
            console.log(err);
        })
      };

      deleteItem = () => {
        const selected = this.state.selected;
        const data = this.state.data;
        if (typeof data[selected] !== 'undefined'){
            const id =  data[selected]._id;

            swal.fire({
                title: 'Estas Seguro?',
                text: "No podras recuperarlo!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Eliminar'
              }).then((result) => {
                if (result.value) {
                    deleteItem(id).then((res)=>{
                        console.log('Deleted!', res);
                        swal.fire({
                            title: 'Elemento Eliminado',
                            type: 'success',
                            confirmButtonText: 'Ok'
                        }).then(()=>{
                            this.getInventory();
                        });
                        
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                }
            });

            
        } else {
            swal.fire({
                title: 'Escoja un Proveedor',
                type: 'info',
                confirmButtonText: 'Ok'
            }).then(()=>{
                this.getInventory();
            });
        }
      }

    render() {
        let {columns, data} = this.state
        return (
            <div className="container mt-3">

                <div className="d-flex justify-content-between">
                    <h2 className="mt-3">Inventario</h2>

                    <MDBRow>
                        <Link to={'/inventory/new'}>
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
                                <MDBBtn onClick={this.getInventory} color="cyan" >
                                    <MDBIcon icon="sync"  className="mr-1" />
                                </MDBBtn>
                        </MDBTooltip>

                        <Link to={this.state.isSelected ? `/inventory/edit/${this.state.selectedId}` : '/inventory/new'}>
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
                                <MDBBtn onClick={this.deleteItem} color="brown" >
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

            </div>
        );
    }
}

export default InventoryTable;