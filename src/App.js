import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Schedule from './components/schedule/schedule';

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

  render() {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              Kotti
            </Link>
            <Link to="/tommi">
              Tommi
            </Link>
            <Link to="/leea">
              Leea
            </Link>
          </header>
          <Switch>
            <Route path="/tommi" render={(props) => <Schedule {...props} name={'tommi'} busstops={personA} />} />
            <Route path="/leea"  render={(props) => <Schedule {...props} name={'leea'} busstops={personB} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;