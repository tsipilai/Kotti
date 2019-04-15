import React, { Component } from 'react';
const Timestamp = require('react-timestamp');

let initialState = {
    userEndPoints: "",
    fromHomeData: "",
    toWorkData: "",
    toHomeData: "",
    fromWorkData: "",
    lines: "",
};

export default class Schedule extends Component {
    compareValues(key, order='asc') {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return ((order === 'desc') ? (comparison * -1) : comparison);
        };
    }

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    reset() {
        this.setState(initialState);
    }
    
    async fechTimeTable(data, lines) {
    let timeTable = [];
    for(const routeUrl of data) {
        const response = await fetch(routeUrl)
        const data = await response.json();
        timeTable = timeTable.concat(data.result);
    }
        let sorted_timeTable = timeTable.sort(this.compareValues('expectedarrivaltime'));
   
        timeTable = sorted_timeTable.filter((bus) => lines.indexOf(bus.lineref) >= 0)
        return timeTable;
    }

    async getDataMulti(data) {
        let { stops } = data

        let home = await this.fechTimeTable(stops.homeUrl, stops.lines);
        let work = await this.fechTimeTable(stops.workUrl, stops.lines);
        let toHome = await this.fechTimeTable(stops.toHomeUrl, stops.lines);
        let fromWork = await this.fechTimeTable(stops.fromWorkUrl, stops.lines);

        if(this.mounted) {
            this.setState({
                fromHomeData: home,
                toWorkData: work,
                fromWorkData: fromWork,
                toHomeData: toHome,
                lines: stops.lines
            });
        }
    }

    async componentWillReceiveProps(nextProps, props) {

      if(nextProps.busstops.stops.homeUrl !== this.props.busstops.stops.homeUrl) {
        await this.setState({
          userEndPoints: nextProps.busstops,
        });
      } else {
        await this.setState({
          userEndPoints: this.props.busstops,
        });
      }
      console.log(this.state.userEndPoints)
        this.initial = this.getDataMulti(this.state.userEndPoints);
    }

    async componentDidMount(nextProps, props) {

      await this.setState({
              userEndPoints: this.props.busstops,
      });

      this.mounted = true;
      
      this.initial = await setTimeout(() => this.getDataMulti(this.state.userEndPoints), 500);
      this.refresh = await setInterval(() => this.getDataMulti(this.state.userEndPoints), 10000);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            
            <div>
            <h1>Kotoo Töihi</h1>
            {this.state.fromHomeData && 
              this.state.fromHomeData.slice(0, 5).map((fromHome) =>
                <div className="buswrap" key={fromHome.datedvehiclejourneyref}>
                <div className="busfrom">
                  <span><strong> {fromHome.lineref}</strong> </span> 
                  <span className="title">Lähtee: </span>
                  <Timestamp time={fromHome.expectedarrivaltime} />
                </div>
                  {this.state.toWorkData && 
                    this.state.toWorkData.filter((toWork) => toWork.datedvehiclejourneyref === fromHome.datedvehiclejourneyref).map((toWork) =>
                    <div className="busto" key={toWork.datedvehiclejourneyref}>
                      <span>Perillä: <Timestamp time={toWork.expectedarrivaltime} format="time"/></span>
                    </div> 
                    )} 
                </div>
              )} 
            <h1>Töist Kotti</h1>
            {this.state.fromWorkData && 
              this.state.fromWorkData.slice(0, 5).map((fromWork) =>
                <div className="buswrap" key={fromWork.datedvehiclejourneyref}>
                <div className="busfrom">
                  <span><strong> {fromWork.lineref}</strong> </span>
                  <span className="title">Lähtee: </span>
                  <Timestamp time={fromWork.expectedarrivaltime} />
                </div>
                  {this.state.toHomeData && 
                    this.state.toHomeData.filter((toHome) => toHome.datedvehiclejourneyref === fromWork.datedvehiclejourneyref).map((toHome) =>
                    <div className="busto" key={toHome.datedvehiclejourneyref}>
                      <span>Perillä: <Timestamp time={toHome.expectedarrivaltime} format="time"/></span>
                    </div> 
                    )}
                </div>
              )}   
              </div>
        )
    }

}