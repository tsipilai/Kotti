import React, { Component } from 'react';
import Schedule from './components/schedule/schedule';

import './App.scss';

const Timestamp = require('react-timestamp');

const homeUrl = '//data.foli.fi/siri/sm/495';
const workUrl = '//data.foli.fi/siri/sm/1031';
const toHomeUrl = '//data.foli.fi/siri/sm/475';
const fromWorkUrl = '//data.foli.fi/siri/sm/1047';
let data = "";

class App extends Component {

  state = {
    fromHomeData: "",
    toWorkData: "",
    toHomeData: "",
    fromWorkData: "",
  };

   getData = () => {
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

  getArrivalTime = (time) => {
    let date = new Date(time * 1000)
    console.log(date.getMinutes())
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  componentWillMount() {
    this.getData();
    this.refresh = setInterval(() => this.getData(), 10000);
  }

  async componentDidMount() {
  }
  render() {
  let { fromHomeData } = this.state;
  console.log(fromHomeData)
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <h1>Kotoa Töihi</h1>
        <Schedule /> 
        {fromHomeData ? 
          fromHomeData.filter((home) => home.lineref == 60 ).map((home) =>
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
          ) : <div>loading</div> } 
        <h1>Töist Kotti</h1>
        {this.state.fromWorkData && 
          this.state.fromWorkData.filter((home) => home.lineref == 60 ).map((home) =>
            <div className="buswrap" key={home.datedvehiclejourneyref}>
            <div className="busfrom">
              <span className="title">Lähtee: </span>
              <span>{home.lineref} </span> 
              <Timestamp time={home.expectedarrivaltime} />
              {console.log(this.getArrivalTime(home.expectedarrivaltime))}
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
