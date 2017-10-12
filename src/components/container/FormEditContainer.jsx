import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import { editAddressAction } from '@Action';
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

class FormEditContainer extends PureComponent {
  state = {
    types: getTypes(this.props.value),
    value: this.props.value,
    id: this.props.id,
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
    }
  }

  saveData = (address) => {
    this.props.editAddressAction(this.state.id, address);
    this.props.onRequestClose();
  }

  toggleUseMap = () => {
    this.setState({
      useMap: !this.state.useMap
    });
  }
  
  render() {
    const {
      onRequest,
      onSuccess
    } = this.props;

    return (
      <div className="edit-form">
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

FormEditContainer.propTypes = {
  editAddressAction: PropTypes.func,
  onRequestClose: PropTypes.func,
  value: PropTypes.object,
  id: PropTypes.string,
  onRequest: PropTypes.bool,
  onSuccess: PropTypes.bool
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    editAddressAction
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormEditContainer);
