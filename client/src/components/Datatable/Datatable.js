import React, { Component } from "react";
import { MDBDataTable, MDBBtn, MDBIcon } from "mdbreact";
import {Link} from "react-router-dom";

class Datatable extends Component {
  state = {
    data: {},
  };

  componentDidMount () {
    
  }

  handleClick = (rowElement) => {
    console.log(rowElement)
  }

  transformData = () => {
    let rawData = this.props.tableData;
    let newData = {columns: [], rows: []}

    rawData.forEach(e => {
        Object.keys(e).map(key => {
            let newColumn = {
                label: key,
                field: key,
                sort: 'asc'
            }
            newData.columns.push(newColumn);
        })
    })

    newData.rows = rawData;

    newData.rows.forEach(e => {
        Object.defineProperty(e, 'clickEvent', {
             value: () => this.handleClick(e),
             configurable : true
            });
    })

    this.setState({
      data: newData
    });
  }

  
  render() {
      
    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h2 className="mt-3">{this.props.tableTitle}</h2>
                <div>

                    <Link to={`/${this.props.newBtnRoute}`}>
                        <MDBBtn color="mdb-color" >
                            <MDBIcon icon="plus-square" className="mr-1" />
                        </MDBBtn>
                    </Link>
                    
                    <MDBBtn onClick={this.transformData} color="blue-grey" >
                        <MDBIcon icon="sync" className="mr-1" />
                    </MDBBtn>
                </div>  
            </div>
            
            <MDBDataTable   
                striped 
                btn
                bordered 
                hover  
                entriesLabel="Mostrar "
                searchLabel="Buscar"
                theadColor="stylish-color"
                theadTextWhite
                info={false} 
                data={this.state.data} />
        </div>
    
    );
  }
}

export default Datatable;
