import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exchangeAction from '@Action/exchangeAction';
import { EXCHANGE_DEFAULT } from '@App/constants';
import { isSameCurrency } from '@App/helpers';
import {
  Exchange,
  ExchangeFilter,
  ExchangeResult
} from '@Presentational';

class ExchangeContainer extends Component {
  state = {
    currencyCurrent: {
      currencyFrom: EXCHANGE_DEFAULT.currencyFrom,
      currencyTo: EXCHANGE_DEFAULT.currencyTo
    },
    amount: EXCHANGE_DEFAULT.amount
  }

  componentWillMount() {
    const { currencyCurrent } = this.state;

    this.props.getRatesAction(
      this.setRequestParams(
        currencyCurrent.currencyFrom,
        currencyCurrent.currencyTo
      )
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exchangeData && nextProps.exchangeData.rates) {
      const {
        amount,
        currencyCurrent
      } = this.state;
      const {
        currencyFrom,
        currencyTo
      } = currencyCurrent;
      const rate = nextProps.exchangeData.rates[currencyCurrent.currencyTo];

      this.calculateExchange(
        amount,
        !isSameCurrency(currencyFrom, currencyTo) ? rate : 1
      );
    }
  }

  onChange = ({ currencyFrom, currencyTo }) => {
    const currencyCurrent = {
      currencyFrom,
      currencyTo
    };

    this.setState({
      currencyCurrent
    });

    this.props.getRatesAction(this.setRequestParams(
      currencyFrom,
      currencyTo
    ));
  }

  setRequestParams = (currencyFrom, currencyTo) => ({
    base: currencyFrom,
    symbols: currencyTo
  })

  convertHandler = ({ amount, currencyFrom, currencyTo }) => {
    this.setState({
      amount: amount || EXCHANGE_DEFAULT.amount
    });

    this.props.getRatesAction(
      this.setRequestParams(
        currencyFrom,
        currencyTo
      )
    );
  }

  calculateExchange(amount = EXCHANGE_DEFAULT.amount, rate) {
    const exchanged = Number(amount * rate).toFixed(5);

    this.setState({
      exchanged
    });
    this.calculateRateInvert(rate);
  }

  calculateRateInvert(rate) {
    const rateInvert = Number(EXCHANGE_DEFAULT.amount / rate).toFixed(4);

    this.setState({
      rateInvert
    });
  }

  render() {
    const {
      exchangeData,
      getRatesRequest,
      getRatesFail
    } = this.props;
    console.log('rendexxr');

    return (
      <Exchange
        onFail={getRatesFail}
      >
        <ExchangeResult
          exchangeData={exchangeData}
          onRequest={getRatesRequest}
          exchanged={this.state.exchanged}
          rateInvert={this.state.rateInvert}
          amount={this.state.amount}
          currencyCurrent={this.state.currencyCurrent}
        />
        <ExchangeFilter
          onRequest={getRatesRequest}
          convertHandler={this.convertHandler}
          onChange={this.onChange}
          currencyCurrent={this.state.currencyCurrent}
        />
      </Exchange>
    );
  }
}

ExchangeContainer.propTypes = {
  getRatesAction: PropTypes.func,
  getRatesRequest: PropTypes.bool,
  getRatesFail: PropTypes.object,
  exchangeData: PropTypes.object
};

const mapStateToProps = state => ({ ...state.exchangeReducer });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...exchangeAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer);
