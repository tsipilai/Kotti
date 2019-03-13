import React, { Component } from 'react';
import Schedule from './components/schedule/schedule';

import './App.scss';

const axios = require('axios');
const Timestamp = require('react-timestamp');

class App extends Component {

  state = {
    fromHomeData: "",
    toWorkData: "",
    toHomeData: "",
    fromWorkData: "",
  };

   getData(data) {

    let { stops } = data;

    axios.all([
      axios.get(stops && stops.homeUrl),
      axios.get(stops && stops.workUrl),
      axios.get(stops && stops.toHomeUrl),
      axios.get(stops && stops.fromWorkUrl)
    ])
    .then(axios.spread((homeurl, workUrl, toHomeUrl, fromWorkUrl) => {         
         this.setState({
          fromHomeData: homeurl.data.result,
          toWorkData: workUrl.data.result,
          fromWorkData: toHomeUrl.data.result,
          toHomeData: fromWorkUrl.data.result
         }
       );
    }))
    .catch((error) => { 
      console.log(error)
    });
  }

  componentDidMount() {

    let tommi = { 
      stops: {
        homeUrl: '//data.foli.fi/siri/sm/495',
        workUrl: '//data.foli.fi/siri/sm/1031',
        toHomeUrl: '//data.foli.fi/siri/sm/475',
        fromWorkUrl: '//data.foli.fi/siri/sm/1047'
      } 
    };
    

    this.getData(tommi);
    this.refresh = setInterval(() => this.getData(tommi), 10000);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">

        </header>
        <h1>Kotoa Töihi</h1>
        <Schedule /> 
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
