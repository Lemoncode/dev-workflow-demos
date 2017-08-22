import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { OrganizationContainer } from './pods/organization/container'

class App extends Component {

  constructor(props) {
    super(props);  
  }

   render() {
    return (
      <div className="App">
        <OrganizationContainer/>
      </div>
    );
  }
}

export default App;
