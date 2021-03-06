import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Sidenav from '../Sidenav/Sidenav';
import NewItem from '../Inventory/NewItem';
import NewProvider from '../Providers/NewProvider';
import ProvidersTable from '../Providers/ProvidersTable';
import InventoryTable from '../Inventory/InventoryTable';
 
class Router extends Component {
    state = {
        // endpoint: `https://${window.location.hostname}`
        endpoint: 'http://localhost:4000',
        editElement: {},
    }

    getInventory = () => {
        console.log('Obteniendo Inventario...'); //Get Inventory Data from Server
        this.setState({
          tableTitle : 'Existencias',
          btnRoute: 'newitem'
        })
    
      }
      getTransactions = () => {
        console.log('Obteniendo Transaciones...');
        this.setState({
          tableTitle : 'Transacciones',
          btnRoute: 'newtransaction'
        })
      }

    render() {
        return (
                <div>
                    <Sidenav/>
                    <Switch>
                        <Redirect exact from="/" to="/inventory" />
                        
                        <Route 
                        exact 
                        path="/providers/new" 
                        component={NewProvider}
                        />

                        <Route 
                        exact 
                        path="/providers/edit/:id" 
                        component={NewProvider}
                        />

                        <Route 
                        exact 
                        path="/providers" 
                        component={ProvidersTable}
                        />

                        <Route 
                        exact 
                        path="/inventory" 
                        component={InventoryTable}
                        />

                        <Route 
                        exact 
                        path="/inventory/new" 
                        component={NewItem}
                        />

                        <Route 
                        exact 
                        path="/inventory/edit/:id" 
                        component={NewItem}
                        />

                    </Switch>
                </div>
           
        );
        
    }

}

export default Router;