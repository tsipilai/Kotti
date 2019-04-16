import React from 'react';
import PropTypes from 'prop-types';
const Timestamp = require('react-timestamp');
const Route = (props) => {

  const { fromData, toData } = props

  return(
    <div>
    {fromData.slice(0, 5).map((outBus) =>
        <div className="buswrap" key={outBus.datedvehiclejourneyref}>
        <div className="busfrom">
          <span><strong> {outBus.lineref}</strong> </span>
          <span className="title">Lähtee: </span>
          <Timestamp time={outBus.expectedarrivaltime} />
        </div>
          {toData.filter((inBus) => inBus.datedvehiclejourneyref === outBus.datedvehiclejourneyref).map((inBus) =>
            <div className="busto" key={inBus.datedvehiclejourneyref}>
              <span>Perillä: <Timestamp time={inBus.expectedarrivaltime} format="time"/></span>
            </div> 
            )}
        </div>
      )}
    </div> 
  )
}

Route.propTypes = {
  fromData: PropTypes.array,
  toData: PropTypes.array
};

export default Route;