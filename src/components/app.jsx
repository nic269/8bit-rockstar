import React from 'react';
import PropTypes from 'prop-types';

const Application = props =>
  (<div className="app container">
    {props.children}
  </div>);

Application.propTypes = {
  children: PropTypes.node.isRequired
};

export default Application;
