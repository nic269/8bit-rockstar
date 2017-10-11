import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CSVLink
} from 'react-csv';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import GetAppIcon from 'material-ui-icons/GetApp';
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Tooltip from 'material-ui/Tooltip';
import {
  editAddressAction,
  getAddressListAction
} from '@Action';
import {
  AddressListTable,
  Loading,
  AddressListMap
} from '@Presentational';
import FormAddContainer from './FormAddContainer';
import FormEditContainer from './FormEditContainer';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: '5rem',
    right: '1rem',
    boxShadow: 'none'
  },
  downloadButton: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: '9rem',
    right: '1rem',
    boxShadow: 'none'
  }
});

class HomeContainer extends PureComponent {
  state = {
    addressList: [],
    formIdEditing: null,
    formValueEditing: null,
    editingDialog: false,
    addingDialog: false
  }

  componentWillMount = () => {
    this.props.getAddressListAction();
  }

  activeEditing = (id, formValue) => {
    this.setState({
      formIdEditing: id,
      formValueEditing: formValue
    }, () => {
      this.toggleDialog('editingDialog');
    });
  }

  toggleDialog = (dialogName) => {
    this.setState({ [dialogName]: !this.state[dialogName] });
  }

  columns = [
    { street: 'Street' },
    { ward: 'Ward' },
    { district: 'District' },
    { city: 'City' },
    { country: 'Country' },
    { action: 'Action' }
  ]

  actionSwitch = {
    edit: {
      action: this.editAddress,
      btnText: 'Edit'
    },
    add: {
      action: this.addAddress,
      btnText: 'Add'
    }
  }

  render() {
    const {
      addressList,
      getAddressListRequest,
      classes,
      addAddressInProgress,
      addAddressSuccess,
      editAddressInProgress,
      editAddressuccess
    } = this.props;
    return (
      <div className="home">
        {
          getAddressListRequest &&
          <Loading />
        }
        {
          !getAddressListRequest && addressList.length > 0 &&
          <AddressListTable
            addressList={addressList}
            columns={this.columns}
            activeEditing={this.activeEditing}
          />
        }
        <AddressListMap />
        
        <CSVLink data={addressList} filename={'8bit-rockstar.csv'} >
          <Tooltip placement="top" title="Download CSV">
            <Button
              fab
              color="accent"
              aria-label="download CSV"
              className={classes.downloadButton}
            >
              <GetAppIcon />
            </Button>
          </Tooltip>
        </CSVLink>
        
        <Tooltip placement="bottom" title="Add address">
          <Button
            fab
            color="primary"
            aria-label="add"
            className={classes.button}
            onClick={() => this.toggleDialog('addingDialog')}
          >
            <AddIcon />
          </Button>
        </Tooltip>

        <Dialog
          className="editingDialog"
          onRequestClose={() => this.toggleDialog('editingDialog')}
          open={this.state.editingDialog}
        >
          <DialogTitle>
            Editing [{this.state.formIdEditing}]
          </DialogTitle>
          <DialogContent>
            <FormEditContainer
              id={this.state.formIdEditing}
              value={this.state.formValueEditing}
              onRequest={editAddressInProgress}
              onSuccess={editAddressuccess}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          className="addingDialog"
          onRequestClose={() => this.toggleDialog('addingDialog')}
          open={this.state.addingDialog}
        >
          <DialogTitle>
            Adding address
          </DialogTitle>
          <DialogContent>
            <FormAddContainer
              onRequest={addAddressInProgress}
              onSuccess={addAddressSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  addressList: PropTypes.array,
  getAddressListAction: PropTypes.func,
  getAddressListRequest: PropTypes.bool,
  classes: PropTypes.object,
  addAddressInProgress: PropTypes.bool,
  addAddressSuccess: PropTypes.bool,
  editAddressInProgress: PropTypes.bool,
  editAddressuccess: PropTypes.bool
};

const mapStateToProps = state => ({ ...state.addressListReducer });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    getAddressListAction,
    editAddressAction
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeContainer));
