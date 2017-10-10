import React from 'react';
import PropTypes from 'prop-types';

const Exchange = ({ onFail, children }) => (
  <div className="exchange">
    <h2 className="exchange__title">Currency Converter</h2>
    { children }
    {
      onFail &&
      <div className="pt-callout pt-intent-danger">
        {
          onFail.code
        }
      </div>
    }
  </div>
);

Exchange.propTypes = {
  children: PropTypes.any,
  onFail: PropTypes.object
};

export default Exchange;
