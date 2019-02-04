import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBContainer, MDBIcon } from "mdbreact";
import './NewItem.css'
import {Link} from "react-router-dom";


class NewItem extends Component {

    state = {
        isTool : false
    }

    descriptionRef = React.createRef();
    providerRef = React.createRef();
    unitsRef = React.createRef();
    maxRef = React.createRef();
    minRef = React.createRef();
    typeRef = React.createRef();
    stockRef = React.createRef();

    saveElement = (e) => {
        e.preventDefault();

        let percentage = (this.stockRef.current.value - this.minRef.current.value)/(this.maxRef.current.value - this.minRef.current.value)*100;

        const element = {
            description: this.descriptionRef.current.value,
            provider: this.providerRef.current.value,
            units: this.unitsRef.current.value,
            max: this.maxRef.current.value,
            min: this.minRef.current.value,
            type: this.typeRef.current.value,
            stock: this.stockRef.current.value,
            percentage: percentage
        }

        console.log(element); //Communicate with Router and save to DB
    }

    checkType = () => {
        if (this.typeRef.current.value === "tool"){
            this.setState({
                isTool: true
            })
        } else {
            this.setState({
                isTool: false
            })
        }
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow center className="mt-5">
                    <MDBCol md="8">
                        <MDBCard>
                            <MDBCardBody>
                                <h3 className="text-center">Nuevo Elemento</h3>
                                <form autoComplete="off" onSubmit={this.saveElement} className="grey-text"> 
                                    <div className="form-group">
                                        <label><MDBIcon icon="file" size=""/> Descripción</label>
                                        <input ref={this.descriptionRef} type="text" className="form-control"/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label><MDBIcon icon="ruler" size=""/> Unidad de Medida</label>
                                            <input ref={this.unitsRef} type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label><MDBIcon icon="truck" size=""/> Proveedor</label>
                                            <select ref={this.providerRef} className="form-control">   
                                                <option disabled>Proveedor</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label><MDBIcon icon="certificate" size=""/> Tipo</label>
                                            <select ref={this.typeRef} className="form-control" onChange={this.checkType}>   
                                                <option defaultValue value="consumable">Consumible</option>
                                                <option value="tool">Herramienta</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label><MDBIcon icon="battery-full" size=""/> Máximos</label>
                                            <input disabled={this.state.isTool} ref={this.maxRef} type="number" className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label><MDBIcon icon="battery-quarter" size=""/> Mínimos</label>
                                            <input disabled={this.state.isTool} ref={this.minRef} type="number" className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label><MDBIcon icon="boxes" size=""/> Existencias</label>
                                            <input ref={this.stockRef} type="number" className="form-control"/>
                                        </div>
                                    </div>

                                    <MDBRow center className="mt-3">
                                        <MDBBtn type="submit" color="mdb-color"> Guardar </MDBBtn>
                                        <Link to="/"><MDBBtn type="reset" color="dark"> Cancelar </MDBBtn></Link>
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

export default NewItem;