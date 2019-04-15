import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

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

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// child matches will...
const switchTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: 0,
    scale: 1.2,
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: 1,
    scale: 1,
  },
};


class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/" className="nav-item">
              Kotti
            </Link>
            <Link to="/tommi" className="nav-item">
              Tommi
            </Link>
            <Link to="/leea" className="nav-item">
              Leea
            </Link>
          </header>
          <AnimatedSwitch
            atEnter={switchTransition.atEnter}
            atLeave={switchTransition.atLeave}
            atActive={switchTransition.atActive}
            mapStyles={mapStyles}
            className="switch-wrapper"
          >
            <Route path="/tommi" render={(props) => <Schedule {...props} name={'tommi'} busstops={personA} />} />
            <Route path="/leea"  render={(props) => <Schedule {...props} name={'leea'} busstops={personB} />} />
          </AnimatedSwitch>
        </div>
      </Router>
    );
  }
}

export default App;