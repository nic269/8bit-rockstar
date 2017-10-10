import React from 'react';
import PropTypes from 'prop-types';
import { isSameCurrency } from '@App/helpers';
import { Loading } from '@Presentational';

const ExchangeResult = (props) => {
  const {
    exchangeData,
    onRequest,
    exchanged,
    rateInvert,
    amount,
    currencyCurrent
  } = props;
  const {
    currencyFrom,
    currencyTo
  } = currencyCurrent;
  const rate = !isSameCurrency(currencyFrom, currencyTo)
    ? exchangeData && exchangeData.rates && exchangeData.rates[currencyTo]
    : 1;
  const date = exchangeData && exchangeData.date;

  const renderResult = () => (
    <div className="result">
      <span className="result__exchange">
        <span className="from">{amount} {currencyFrom}</span>
        <span> = </span>
        <span className="to">
          <span className="result__exchanged">{exchanged}</span> {currencyTo}
        </span>
      </span>
      <div className="result__expand">
        <span>
          1 {currencyFrom} = {rate} {currencyTo}
        </span>
        <span>
          1 {currencyTo} = {rateInvert} {currencyFrom}
        </span>
      </div>
      <div className="result__date">
        <span>
          up to date: { date }
        </span>
      </div>
    </div>
  );

  return (
    <div className="exchange__result">
      {
        exchangeData && exchangeData.rates &&
          renderResult()
      }
      {
        onRequest &&
        <Loading />
      }
    </div>
  );
};

ExchangeResult.propTypes = {
  exchangeData: PropTypes.object,
  onRequest: PropTypes.bool,
  exchanged: PropTypes.string,
  rateInvert: PropTypes.string,
  amount: PropTypes.any,
  currencyCurrent: PropTypes.object
};

export default ExchangeResult;
