import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Schedule from './components/schedule/schedule';
import Weather from './components/weather/weather';
import Shibe from './components/shibe/shibe';
import './App.scss';

const personA = { 
  stops: {
    homeUrl: ['//data.foli.fi/siri/sm/495'],
    workUrl: ['//data.foli.fi/siri/sm/1031'],
    toHomeUrl: ['//data.foli.fi/siri/sm/475'],
    fromWorkUrl: ['//data.foli.fi/siri/sm/1047'],
    lines: ["60"]
  } 
};

const personB = { 
  stops: {
    homeUrl: ['//data.foli.fi/siri/sm/495','//data.foli.fi/siri/sm/825'],
    workUrl: ['//data.foli.fi/siri/sm/41', '//data.foli.fi/siri/sm/89'],
    toHomeUrl: ['//data.foli.fi/siri/sm/211', '//data.foli.fi/siri/sm/19'],
    fromWorkUrl: ['//data.foli.fi/siri/sm/810', '//data.foli.fi/siri/sm/475'],
    lines: ["7","6","60","300","301","302","300"]
  }, 
};


class App extends Component {

  state = {
    weather: "",
    shibe: "",
  }

  async componentDidMount() {

    const weather_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=633679&lang=fi&units=metric&appid=12a2811bf39c85349c40638f409756dc`);
    const weather_response = await weather_call.json();

    var corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
		var apiUrl = 'http://shibe.online/api/shibes?count=1';

    const shibe_call = await fetch(corsAnywhere + apiUrl);
    console.log(shibe_call)
    const shibe_response = await shibe_call.json();

    console.log(shibe_response)

    this.setState({
      weather: weather_response,
      shibe: shibe_response,
    })

  }

  render() {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/" className="nav-item">
              &larr;
            </Link>
            <Link to="/tommi" className="nav-item">
              Tommi
            </Link>
            <Link to="/leea" className="nav-item">
              Leea
            </Link>
          </header>
          <Switch>
            {this.state.weather && 
              <Route exact path="/"  render={(props) =>
                <Fragment>
                  <Weather {...props} weather={this.state.weather} />
                  <Shibe {...props} shibe={this.state.shibe} />
                </Fragment> 
              } />
            }
            <Route path="/tommi" render={(props) => <Schedule {...props} name={'tommi'} busstops={personA} />} />
            <Route path="/leea"  render={(props) => <Schedule {...props} name={'leea'} busstops={personB} />} />
            
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;