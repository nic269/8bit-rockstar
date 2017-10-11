import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import pink from 'material-ui/colors/pink';
import Button from 'material-ui/Button';

const Form = t.form.Form;

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    textAlign: 'center'
  },
  buttonSuccess: {
    backgroundColor: pink[500],
    '&:hover': {
      backgroundColor: pink[700],
    },
  },
  buttonProgress: {
    color: pink[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class AddressForm extends PureComponent {
  render() {
    const {
      types,
      options,
      onSubmit,
      onChange,
      value,
      onRequest,
      classes
    } = this.props;

    return (
      <form
        onSubmit={e => onSubmit(e, this.addressForm)}
        className="address-form"
      >
        <Form
          ref={(addressForm) => { this.addressForm = addressForm; }}
          type={types}
          options={options}
          value={value}
          onChange={onChange}
        />
        <div className={`form-group ${classes.wrapper}`}>
          <Button
            raised
            color="primary"
            disabled={onRequest}
            type="submit"
          >
            Save
          </Button>
          {
            onRequest &&
            <CircularProgress size={24} className={classes.buttonProgress} />
          }
        </div>
      </form>
    );
  }
}

AddressForm.propTypes = {
  types: PropTypes.func,
  options: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.object,
  onRequest: PropTypes.bool,
  classes: PropTypes.object
};

export default withStyles(styles)(AddressForm);
