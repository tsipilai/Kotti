import React from 'react';
import PropTypes from 'prop-types';

const Shibe = (props) => {

  const { shibe } = props

  return (
    <div className="shibe_wrap">
      <h1 className="title">Päivän shibe</h1>
      <img src={shibe[0]} alt="Päivän shibe" />
    </div>
  )
}

Shibe.propTypes = {
  shibe: PropTypes.array,
};

export default Shibe;