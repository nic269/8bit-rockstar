import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

const Form = t.form.Form;

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

const formOptions = {
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

class AddressListForm extends PureComponent {
  state = {
    types: getTypes(),
    value: null
  }
  
  onChange = (value) => {
    this.setState({
      types: getTypes(value),
      value
    });
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const value = this.addressForm.getValue();
    if (value) {
      this.props.addAddress(value);
      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({
      types: getTypes(),
      value: null
    });
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Form
          ref={(addressForm) => { this.addressForm = addressForm; }}
          type={this.state.types}
          options={formOptions}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    );
  }
}

AddressListForm.propTypes = {
  addAddress: PropTypes.func
};

export default AddressListForm;
