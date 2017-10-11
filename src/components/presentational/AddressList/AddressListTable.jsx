import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AddressListTable extends PureComponent {
  render() {
    const { addressList, columns } = this.props;
    return (
      <table className="table">
        <thead className="thead-inverse">
          <tr>
            {
              columns.map((column, index) => {
                const key = Object.keys(column)[0];
                return (
                  <th key={index}>{column[key]}</th>
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            addressList && addressList.length > 0 &&
            addressList.map((address, addressIdx) => (
              <tr key={addressIdx}>
                {
                  columns.map((column, columnIdx) => {
                    const key = Object.keys(column)[0];

                    return (
                      <td key={columnIdx}>
                        { address[key] }
                      </td>
                    );
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

AddressListTable.propTypes = {
  addressList: PropTypes.array,
  columns: PropTypes.array
};

export default AddressListTable;
