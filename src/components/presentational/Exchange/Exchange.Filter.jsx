import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { EXCHANGE_DEFAULT, allCurrency, currencyInformation } from '@App/constants';
import { validateInput } from '@App/helpers';

class ExchangeFilter extends React.Component {
  onChange = () => {
    this.props.onChange(this.getCurrencyCurrent());
  }

  onkeypressHandler = (e) => {
    if (e.which === 13) {
      this.convertHandler();
    }
  }

  getCurrencyCurrent = () => ({
    currencyFrom: this.currencyFrom.value,
    currencyTo: this.currencyTo.value
  })

  convertHandler = () => {
    const amount = validateInput(this.currencyAmount.value)
      ? this.currencyAmount.value
      : EXCHANGE_DEFAULT.amount;

    this.props.convertHandler({
      amount,
      ...this.getCurrencyCurrent()
    });
  }

  renderOptionCurrency = (type = '') => allCurrency.map((item, index) => {
    if (type && index === 0) {
      return <option value={type} key={item}>{type} - {currencyInformation[type].name}</option>;
    }
    if (type && type === item) {
      return '';
    }
    return (
      <option value={item} key={item}>{item} - {currencyInformation[item].name}</option>
    );
  })

  render() {
    const {
      onRequest,
      currencyCurrent
    } = this.props;

    return (
      <div className="exchange__filter">
        <div className="row">
          <div className="col-md-3">
            <input
              ref={(currencyAmount) => { this.currencyAmount = currencyAmount; }}
              type="text"
              className="form-control currency__input"
              onKeyPress={this.onkeypressHandler}
              placeholder={EXCHANGE_DEFAULT.amount}
            />
          </div>

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group exchange__option from">
                  <div className="current-currency-from exchange__option__selector">
                    <span className="currency__code">
                      {
                        currencyCurrent.currencyFrom
                      }
                    </span>
                    <span className="currency__nation">
                      {
                        currencyInformation[currencyCurrent.currencyFrom].name
                      }
                    </span>
                  </div>
                  <select
                    ref={(currencyFrom) => { this.currencyFrom = currencyFrom; }}
                    name="currencyFrom"
                    id="currencyFrom"
                    className="currency__from"
                    onChange={() => { this.currencyFrom ? this.onChange() : null; }}
                    disabled={onRequest}
                  >
                    {
                      this.renderOptionCurrency(EXCHANGE_DEFAULT.currencyFrom)
                    }
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group exchange__option to">
                  <span className="current-currency-to exchange__option__selector">
                    <span className="currency__code">
                      {
                        currencyCurrent.currencyTo
                      }
                    </span>
                    <span className="currency__nation">
                      {
                        currencyInformation[currencyCurrent.currencyTo].name
                      }
                    </span>
                  </span>
                  <select
                    ref={(currencyTo) => { this.currencyTo = currencyTo; }}
                    name="currencyTo"
                    id="currencyTo"
                    className="currency__to"
                    onChange={() => { this.currencyTo ? this.onChange() : null; }}
                    disabled={onRequest}
                  >
                    {
                      this.renderOptionCurrency(EXCHANGE_DEFAULT.currencyTo)
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="exchange__action">
          <div className="row">
            <div className="col md-6">
              <button
                className="btn btn-danger"
                onClick={this.convertHandler}
              >
                Convert
              </button>
            </div>

            <div className="col-md-6">
              <button
                className="btn btn-info"
                onClick={() => browserHistory.push('/about')}
              >
                About this app
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ExchangeFilter.propTypes = {
  onRequest: PropTypes.bool,
  convertHandler: PropTypes.func,
  onChange: PropTypes.func,
  currencyCurrent: PropTypes.object
};

export default ExchangeFilter;
