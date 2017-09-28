import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import configureStore from './store';
import { OrganizationContainer } from './pods/organization/container'

const WrappedProvider = ({ children }) => (
  <Provider store={configureStore({})}>{children}</Provider>
);

class App extends Component {
   render() {
    return (
      <div className="App">
         <WrappedProvider>
            <OrganizationContainer/>
         </WrappedProvider>
      </div>
    );
  }
}

export default App;
