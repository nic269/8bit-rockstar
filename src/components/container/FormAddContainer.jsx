import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import { addAddressAction } from '@Action';
import { AddressForm } from '@Presentational';
import AddressMapContainer from './AddressMapContainer';

const getTypes = (value = null) => {
  const types = {
    street: t.String,
    ward: t.String,
    district: t.String,
    city: t.maybe(t.String),
    country: t.maybe(t.String)
  };

  if (value && value.city) {
    Object.assign(types, {
      ward: t.maybe(t.String),
      district: t.maybe(t.String)
    });
  }

  return t.struct(types);
};

const options = {
  fields: {
    street: {
      auto: 'none',
      type: 'text',
      error: 'street required',
      attrs: {
        autoFocus: true,
        placeholder: 'Street'
      }
    },
    ward: {
      auto: 'none',
      type: 'text',
      error: 'ward required',
      attrs: {
        placeholder: 'Ward'
      }
    },
    district: {
      auto: 'none',
      type: 'text',
      error: 'district required',
      attrs: {
        placeholder: 'district'
      }
    },
    city: {
      auto: 'none',
      type: 'text',
      error: 'city required',
      attrs: {
        placeholder: 'city'
      }
    },
    country: {
      auto: 'none',
      type: 'text',
      error: 'country required',
      attrs: {
        placeholder: 'country'
      }
    }
  }
};

class FormAddContainer extends PureComponent {
  state = {
    types: getTypes(),
    value: null,
    useMap: false
  }

  onChange = (value) => {
    this.setState({
      types: getTypes(value),
      value
    });
  }
  
  onSubmit = (e, form) => {
    e.preventDefault();
    const value = form.getValue();
    if (value) {
      this.saveData(value);
      this.resetForm();
    }
  }

  saveData = (address) => {
    this.props.addAddressAction(address);
    this.props.onRequestClose();
  }

  toggleUseMap = () => {
    this.setState({
      useMap: !this.state.useMap
    });
  }

  resetForm = () => {
    this.setState({
      types: getTypes(),
      value: null
    });
  }
  
  render() {
    const {
      onRequest,
      onSuccess
    } = this.props;

    return (
      <div className="add-form">
        <Button 
          raised
          color="primary"
          onClick={this.toggleUseMap}
        >
          Toggle use map
        </Button>
        {
          !this.state.useMap &&
          <AddressForm
            types={this.state.types}
            options={options}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            value={this.state.value}
            onRequest={onRequest}
            onSuccess={onSuccess}
          />
        }
        {
          this.state.useMap &&
          <AddressMapContainer
            saveData={this.saveData}
            onRequest={onRequest}
            onSuccess={onSuccess}
          />
        }
      </div>
    );
  }
}

FormAddContainer.propTypes = {
  addAddressAction: PropTypes.func,
  onRequestClose: PropTypes.func,
  onRequest: PropTypes.bool,
  onSuccess: PropTypes.bool
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    addAddressAction
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddContainer);
