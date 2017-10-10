import React from 'react';
import PropTypes from 'prop-types';

const Loading = props => (
  <div className={`pt-spinner ${props.className} ${props.size}`}>
    <div className="pt-spinner-svg-container">
      <svg viewBox="0 0 100 100">
        <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89" />
        <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5" />
      </svg>
    </div>
  </div>
);

Loading.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string
};

Loading.defaultProps = {
  size: '',
  className: ''
};

export default Loading;
