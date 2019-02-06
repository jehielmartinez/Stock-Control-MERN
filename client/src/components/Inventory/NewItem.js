import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBIcon
} from "mdbreact";
import { Link } from "react-router-dom";
import { saveItem, editItem, selectItem } from "./InventoryFunctions";
import { getProviders, selectProvider } from "../Providers/ProviderFunctions";
import swal from "sweetalert2";


class NewItem extends Component {
  state = {
    isTool: false,
    providers: [],
    selectedId: "",
    selectedItem: {},
    onEdit: false
  };

  descriptionRef = React.createRef();
  providerRef = React.createRef();
  unitsRef = React.createRef();
  maxRef = React.createRef();
  minRef = React.createRef();
  typeRef = React.createRef();
  stockRef = React.createRef();

  componentDidMount() {
    this.getProvidersOptions();

    selectItem(this.props.match.params.id).then(
      response => {
        this.setState({
          selectedId: this.props.match.params.id,
          selectedItem: response.data.item,
          onEdit: true
        });
        this.checkType();
      },
      err => {
        console.log(err);
      }
    );
   
  }

  getProvidersOptions() {
    getProviders().then(
      response => {
        console.log(response.data);
        const providers = response.data.allProviders;
        const providerOptions = [];

        providers.forEach((provider, index) => {
          providerOptions.push(
            <option key={index} value={provider._id}>
              {provider.company}
            </option>
          );
        });

        this.setState({
          providers: providerOptions
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  saveElement = e => {
    e.preventDefault();
    let selectedProvider = {};
    let item = {};

    selectProvider(this.providerRef.current.value).then(
      res => {
        selectedProvider = res.data.provider;
    
        if (selectedProvider !== null) {
          item = {
            description: this.descriptionRef.current.value,
            provider: selectedProvider.company,
            units: this.unitsRef.current.value,
            max: this.maxRef.current.value,
            min: this.minRef.current.value,
            type: this.typeRef.current.value,
            stock: this.stockRef.current.value,
            providerId: selectedProvider._id
          };
          if (this.state.selectedId) {
            editItem(item, this.state.selectedId).then(
              res => {
                console.log("Updated!", res);
                swal
                  .fire({
                    title: "Elemento Guardado!",
                    type: "success",
                    text: res.data.description,
                    confirmButtonText: "Ok"
                  })
                  .then(() => {
                    this.props.history.push("/inventory");
                  });
              },
              err => {
                console.log(err);
                swal.fire({
                  title: "Error!",
                  type: "error",
                  text: "Error del Servidor",
                  confirmButtonText: "Ok"
                });
              }
            );
          } else {
            saveItem(item).then(
              res => {
                console.log("Saved", res);
                swal
                  .fire({
                    title: "Elemento Guardado!",
                    type: "success",
                    text: res.data.description,
                    confirmButtonText: "Ok"
                  })
                  .then(() => {
                    this.props.history.push("/inventory");
                  });
              },
              err => {
                console.log(err);
                swal.fire({
                  title: "Error!",
                  type: "error",
                  text: "Error del Servidor",
                  confirmButtonText: "Ok"
                });
              }
            );
          }
        } else {
          swal.fire({
            title: "Error!",
            type: "error",
            text: "Proveedor No Encontrado",
            confirmButtonText: "Ok"
          });
        }
      },
      err => {
        console.log(err);
        swal.fire({
          title: "Error!",
          type: "error",
          text: "Error del Servidor",
          confirmButtonText: "Ok"
        });
      }
    );
  };

  checkType = () => {
    if (this.typeRef.current.value === "Herramienta") {
      this.setState({
        isTool: true
      });
    } else {
      this.setState({
        isTool: false
      });
    }
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow center className="mt-5">
          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody>
                <h3 className="text-center">Nuevo Elemento</h3>
                <form
                  autoComplete="off"
                  onSubmit={this.saveElement}
                  className="grey-text"
                >
                  <div className="form-group">
                    <label>
                      <MDBIcon icon="file" size="" /> Descripción
                    </label>
                    <input
                      defaultValue={this.state.selectedItem.description}
                      ref={this.descriptionRef}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>
                        <MDBIcon icon="ruler" size="" /> Unidad de Medida
                      </label>
                      <input
                        defaultValue={this.state.selectedItem.units}
                        ref={this.unitsRef}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-5">
                      <label>
                        <MDBIcon icon="truck" size="" /> Proveedor
                      </label>
                      <select ref={this.providerRef} className="form-control">
                        <option value={this.state.selectedItem.providerId}>
                          {this.state.selectedItem.provider}
                        </option>
                        {this.state.providers}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label>
                        <MDBIcon icon="certificate" size="" /> Tipo
                      </label>
                      <select
                        ref={this.typeRef}
                        className="form-control"
                        onChange={this.checkType}
                      >
                        <option default>{this.state.selectedItem.type}</option>
                        <option>Consumible</option>
                        <option>Herramienta</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>
                        <MDBIcon icon="battery-full" size="" /> Máximos
                      </label>
                      <input
                        defaultValue={this.state.selectedItem.max}
                        disabled={this.state.isTool}
                        ref={this.maxRef}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>
                        <MDBIcon icon="battery-quarter" size="" /> Mínimos
                      </label>
                      <input
                        defaultValue={this.state.selectedItem.min}
                        disabled={this.state.isTool}
                        ref={this.minRef}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>
                        <MDBIcon icon="boxes" size="" /> Existencias
                      </label>
                      <input
                        defaultValue={this.state.selectedItem.stock}
                        ref={this.stockRef}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <MDBRow center className="mt-3">
                    <MDBBtn type="submit" color="mdb-color">
                      {" "}
                      Guardar{" "}
                    </MDBBtn>
                    <Link to="/">
                      <MDBBtn type="reset" color="dark">
                        {" "}
                        Cancelar{" "}
                      </MDBBtn>
                    </Link>
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
