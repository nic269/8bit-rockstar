import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import classnames from 'classnames';

class FormsyInput extends PureComponent {
  getCustomErrorMessage() {
    return this.props.showError() ? 'required field' : '';
  }

  changeValue = (e) => {
    console.log(e);
    this.props.setValue(e.currentTarget.value);
  }

  render() {
    const {
      className,
      name,
      title
    } = this.props;
    const groupClassName = classnames({
      'form-group': true,
      className,
      required: this.props.showRequired(),
      error: this.props.showError()
    });
    const errorMessage = this.getCustomErrorMessage();
    return (
      <div className={groupClassName}>
        <label htmlFor={name}>{title}</label>
        <input type="text" name={name} onChange={this.changeValue} value={this.props.getValue() || ''} />
        <span className="validation-error">{errorMessage}</span>
      </div>
    );
  }
}

FormsyInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  showRequired: PropTypes.func,
  showError: PropTypes.func,
  setValue: PropTypes.func,
  getValue: PropTypes.func
};

export default HOC(FormsyInput);
