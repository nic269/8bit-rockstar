import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
    boxShadow: 'none',
    width: '35px',
    height: '35px'
  },
  icon: {
    width: '18px',
    height: '18px'
  }
});
class AddressListTable extends PureComponent {
  render() {
    const { addressList, columns, activeEditing, classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                columns.map((column, index) => {
                  const key = Object.keys(column)[0];
                  return (
                    <TableCell key={index}>{column[key]}</TableCell>
                  );
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              addressList && addressList.length > 0 &&
              addressList.map((address, addressIdx) => (
                <TableRow key={addressIdx}>
                  {
                    columns.map((column, columnIdx) => {
                      const key = Object.keys(column)[0];
                      if (key === 'action') {
                        return (
                          <TableCell key={columnIdx}>
                            <Tooltip placement="left" title="Edit address">
                              <Button
                                fab
                                color="accent"
                                aria-label="edit"
                                className={classes.button}
                                onClick={() => activeEditing(
                                  addressList[addressIdx].id,
                                  addressList[addressIdx]
                                )}
                              >
                                <ModeEditIcon className={classes.icon} />
                              </Button>
                            </Tooltip>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={columnIdx}>
                          { address[key] }
                        </TableCell>
                      );
                    })
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

AddressListTable.propTypes = {
  addressList: PropTypes.array,
  columns: PropTypes.array,
  activeEditing: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(AddressListTable);
