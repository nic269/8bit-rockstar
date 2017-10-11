import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getAddressListAction from '@Action/getAddressListAction';
import * as addAddressAction from '@Action/addAddressAction';
import { watchAddressAddedEvent } from '@Action/addressAdded';
import {
  AddressList,
  Loading
} from '@Presentational';

class HomeContainer extends PureComponent {
  state = {
    addressList: []
  }

  componentWillMount = () => {
    this.props.getAddressListAction();
    this.props.watchAddressAddedEvent();
  }

  addAddress = (address) => {
    this.props.addAddressAction(address);
  }

  columns = [
    { id: '#' },
    { street: 'Street' },
    { ward: 'Ward' },
    { city: 'City' },
    { country: 'Country' },
  ]

  render() {
    const { addressList, getAddressListRequest } = this.props;
    console.log(this.props);
    return (
      <div className="home">
        {
          getAddressListRequest &&
          <Loading />
        }
        {
          !getAddressListRequest && addressList.length > 0 &&
          <AddressList
            addressList={addressList}
            columns={this.columns}
          />
        }
        <button
          onClick={() => this.addAddress({
            street: '77 Tran Nhan Ton',
            ward: 'ward 9',
            district: 'district 5',
            city: 'HCMC',
            country: 'VN'
          })}
        >add address</button>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  addressList: PropTypes.array,
  getAddressListAction: PropTypes.func,
  addAddressAction: PropTypes.func,
  watchAddressAddedEvent: PropTypes.func,
  getAddressListRequest: PropTypes.bool
};

const mapStateToProps = state => ({ ...state.addressListReducer });
const mapDispatchToProps = (dispatch) => {
  // watchAddressAddedEvent(dispatch);
  return ({
    ...bindActionCreators({
      ...getAddressListAction,
      ...addAddressAction,
      watchAddressAddedEvent
    }, dispatch)
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
