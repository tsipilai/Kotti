import React, { Component } from 'react';
import './App.scss';

const Timestamp = require('react-timestamp');

const homeUrl = 'http://data.foli.fi/siri/sm/495';
const workUrl = 'http://data.foli.fi/siri/sm/1031';
const toHomeUrl = 'http://data.foli.fi/siri/sm/475';
const fromWorkUrl = 'http://data.foli.fi/siri/sm/1047';
let data = "";

class App extends Component {

  state = {
    fromHomeData: "",
    toWorkData: "",
    toHomeData: "",
    fromWorkData: "",
  };

   getData = () => {
    console.log('moi')
    data = fetch(homeUrl);
    data.then(response => response.json()) 
    .then(json => {            
         this.setState({
          fromHomeData: json.result
         }
       );
    })
    data = fetch(workUrl);
    data.then(response => response.json()) 
    .then(json => {   
         this.setState({
          toWorkData: json.result
         }
       );
    })
    .catch(error => {                  
    });
    data = fetch(fromWorkUrl);
    data.then(response => response.json()) 
    .then(json => {   
         this.setState({
          fromWorkData: json.result
         }
       );
    })
    .catch(error => {                  
    });
    data = fetch(toHomeUrl);
    data.then(response => response.json()) 
    .then(json => {   
         this.setState({
          toHomeData: json.result
         }
       );
    })
    .catch(error => {                  
    });
  }

  componentWillMount() {
    this.getData();
    this.refresh = setInterval(() => this.getData(), 10000);
  }

  async componentDidMount() {
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">

        </header>
        <h1>Kotoa Töihi</h1>
        {this.state.fromHomeData && 
          this.state.fromHomeData.filter((home) => home.lineref == 60 ).map((home) =>
            <div className="buswrap" key={home.datedvehiclejourneyref}>
            <div className="busfrom">
              <span className="title">Lähtee: </span>
              <span>{home.lineref} </span> 
              <Timestamp time={home.expectedarrivaltime} />
            </div>

              {this.state.toWorkData && 
                this.state.toWorkData.filter((work) => work.datedvehiclejourneyref === home.datedvehiclejourneyref).map((work) =>
                <div className="busto" key={work.datedvehiclejourneyref}>
                  <span>Perillä: <Timestamp time={work.destinationaimedarrivaltime} format="time"/></span>
                </div> 
                )}
            </div>
          )} 
        <h1>Töist Kotti</h1>
        {this.state.fromWorkData && 
          this.state.fromWorkData.filter((home) => home.lineref == 60 ).map((home) =>
            <div className="buswrap" key={home.datedvehiclejourneyref}>
            <div className="busfrom">
              <span className="title">Lähtee: </span>
              <span>{home.lineref} </span> 
              <Timestamp time={home.expectedarrivaltime} />
            </div>

              {this.state.toHomeData && 
                this.state.toHomeData.filter((work) => work.datedvehiclejourneyref === home.datedvehiclejourneyref).map((work) =>
                <div className="busto" key={work.datedvehiclejourneyref}>
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
