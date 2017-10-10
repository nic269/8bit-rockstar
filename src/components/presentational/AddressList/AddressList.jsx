import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AddressListTable from './AddressListTable';

class AddressList extends PureComponent {
  render() {
    const { addressList, columns } = this.props;
    return (
      <AddressListTable
        addressList={addressList}
        columns={columns}
      />
    );
  }
}

AddressList.propTypes = {
  addressList: PropTypes.array,
  columns: PropTypes.array
};

export default AddressList;
