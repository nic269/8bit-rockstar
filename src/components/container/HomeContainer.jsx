import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import {
  addAddressAction,
  editAddressAction,
  getAddressListAction
} from '@Action';
import {
  AddressList,
  Loading,
  FormsyInput
} from '@Presentational';

class HomeContainer extends PureComponent {
  state = {
    addressList: []
  }

  componentWillMount = () => {
    this.props.getAddressListAction();
  }

  addAddress = (address) => {
    this.props.addAddressAction(address);
  }

  editAddress = (address) => {
    this.props.editAddressAction('-Kw8l7oajNTVTaLrWaB8', address);
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
        <button
          onClick={() => this.editAddress({
            street: '80 Tran Nhan Ton',
            ward: 'ward 3',
            district: 'district 15',
            city: 'HCMC',
            country: 'VN'
          })}
        >edit address</button>
        <Formsy.Form onSubmit={this.submit} className="custom-validation">
          <FormsyInput name="test" title="test input" />
          <button type="submit">Submit</button>
        </Formsy.Form>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  addressList: PropTypes.array,
  getAddressListAction: PropTypes.func,
  addAddressAction: PropTypes.func,
  editAddressAction: PropTypes.func,
  getAddressListRequest: PropTypes.bool
};

const mapStateToProps = state => ({ ...state.addressListReducer });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    getAddressListAction,
    addAddressAction,
    editAddressAction
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
