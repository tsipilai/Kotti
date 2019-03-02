import React, { Component } from 'react';
import './App.css';

const Timestamp = require('react-timestamp');

const homeUrl = 'http://data.foli.fi/siri/sm/495';
const workUrl = 'http://data.foli.fi/siri/sm/1031';
let data = "";

class App extends Component {

  state = {
    homeStopData: "",
    workStopData: "",
  };

  function getData() {
    data = fetch(homeUrl);
    data.then(response => response.json()) 
    .then(json => {            
         this.setState({
          homeStopData: json.result
         }
       );
    })
    data = fetch(workUrl);
    data.then(response => response.json()) 
    .then(json => {   
         this.setState({
          workStopData: json.result
         }
       );
    })
    .catch(error => {                  
    });
  }

  async componentDidMount() {
    getData();
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">

        </header>
        Kotoa Töihi
        {this.state.homeStopData && 
          this.state.homeStopData.filter((home) => home.lineref == 60 ).map((home) =>
            <div key={home.datedvehiclejourneyref}>
              <span className="title">Lähtee: </span>
              <span>{home.lineref} </span> 
              <Timestamp time={home.expectedarrivaltime} />
              {this.state.workStopData && 
                this.state.workStopData.filter((work) => work.datedvehiclejourneyref === home.datedvehiclejourneyref).map((work) =>
                <div key={work.datedvehiclejourneyref}>
                  <span>Perillä: <Timestamp time={work.destinationaimedarrivaltime} format="time"/></span>
                </div> 
                )}
            </div>
          )} 
      </div>
    );
  }
}

export default App;
