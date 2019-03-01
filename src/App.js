import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const Timestamp = require('react-timestamp');

const homeUrl = 'http://data.foli.fi/siri/sm/495/pretty';
const workUrl = 'http://data.foli.fi/siri/sm/1031/pretty';
let data = "";

class App extends Component {

  state = {
    homeStopData: "",
    workStopData: "",
  };

  async componentDidMount() {
    data = fetch(homeUrl);
    data.then(response => response.json()) 
    .then(json => {   
      console.log(Array.isArray(json.result))    
      console.log(json.result.map((result) => result))            
         this.setState({
          homeStopData: json.result
         }
       );
    })
    data = fetch(workUrl);
    data.then(response => response.json()) 
    .then(json => {   
      console.log(Array.isArray(json.result))    
      console.log(json.result.map((result) => result))            
         this.setState({
          workStopData: json.result
         }
       );
    })
    .catch(error => {                  
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        Kotoa Töihi
        {this.state.homeStopData && 
          this.state.homeStopData.map((result, i) =>
            <div key={i}>
              <span>{result.lineref} </span> 
              <Timestamp time={result.expectedarrivaltime} />
              <span>Auto: {result.vehicleref}</span>
            </div>
          )} 
         Saapuu töihi
         {this.state.workStopData && 
          this.state.workStopData.map((result, i) =>  
            <div key={i}>
              <span>{result.lineref} </span> 
              <Timestamp time={result.expectedarrivaltime} />
              <span>Auto: {result.vehicleref}</span>
            </div>
          )}  
        </header>
      </div>
    );
  }
}

export default App;
