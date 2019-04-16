import React from 'react';
import PropTypes from 'prop-types';

const Weather = (props) => {

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  const { weather } = props

  return(
    <div className="weather">
      <h1 className="temperature">{round(weather.main.temp, 1)}<span className="celsius">°c</span></h1>
      <h3 className="description">{weather.weather[0].description}</h3>
    </div>
  )
}

Weather.propTypes = {
  weather: PropTypes.object,
};

export default Weather;