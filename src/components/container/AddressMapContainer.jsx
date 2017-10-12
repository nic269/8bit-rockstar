import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import pink from 'material-ui/colors/pink';
import Button from 'material-ui/Button';
import { MAP } from 'react-google-maps/lib/constants';
import Geosuggest from 'react-geosuggest';
import { CENTER_DEFAULT } from '@Util/constants';
import { Map } from '@Presentational';

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

class AddressMapContainer extends PureComponent {
  state = {
    locationPosition: CENTER_DEFAULT,
    address: null
  }

  onMapLoadHandler = (map) => {
    this.map = map && map.context[MAP];
  }

  onSuggestSelect = (suggestData) => {
    if (suggestData && suggestData.gmaps && suggestData.gmaps.address_components) {
      const { location } = suggestData;
      this.map.setCenter(location);
      const address = this.getAddressFromGGData(suggestData.gmaps.address_components);
      this.setState({
        locationPosition: location,
        address
      });
    }
  }

  onSubmit = () => {
    this.props.saveData(this.state.address);
  }

  getAddressFromGGData = (addressComponents) => {
    const addressTemp = {};
    addressComponents.forEach((c) => {
      if (c.types.includes('street_number')) {
        addressTemp.streetNumber = c.long_name;
        return true;
      }
      if (c.types.includes('street_number')) {
        addressTemp.streetNumber = c.long_name;
        return true;
      }
      if (c.types.includes('route')) {
        addressTemp.streetName = c.long_name;
        return true;
      }
      if (c.types.includes('sublocality_level_1') || c.types.includes('sublocality')) {
        addressTemp.ward = c.long_name;
        return true;
      }
      if (c.types.includes('administrative_area_level_2')) {
        addressTemp.district = c.long_name;
        return true;
      }
      if (c.types.includes('neighborhood') || c.types.includes('locality') || c.types.includes('administrative_area_level_1')) {
        addressTemp.city = c.long_name;
        return true;
      }
      if (c.types.includes('country')) {
        addressTemp.country = c.long_name;
        return true;
      }
    });

    const createStreet = (strNum = '', strName = '') => `${strNum} ${strName}`;

    const {
      streetNumber,
      streetName,
      ...otherAddressTemp
    } = addressTemp;

    return {
      street: createStreet(streetNumber, streetName),
      ...otherAddressTemp
    };
  }

  markerDragHandler = (marker) => {
    const geocoder = new google.maps.Geocoder();
    const { latLng } = marker;

    geocoder.geocode({
      latLng
    }, (res) => {
      const address = this.getAddressFromGGData(res[0].address_components);
      this.setState({
        address
      });
    });
    this.map.setCenter(latLng);
  }

  render() {
    const {
      classes,
      onRequest
    } = this.props;
    return (
      <div className="address-map">
        <Geosuggest
          ref={(el) => { this.geoSuggest = el; }}
          initialValue={(this.state.address && Object.values(this.state.address).join(' ')) || ''}
          placeholder="enter your address"
          country="vn"
          onSuggestSelect={gmaps => this.onSuggestSelect(gmaps)}
          inputClassName="form-control"
          suggestsHiddenClassName="hidden"
        />
        <Map
          onMapLoad={this.onMapLoadHandler}
          containerElement={
            <div className="map__wrapper" />
          }
          mapElement={
            <div style={{ height: '100%', width: '100%' }} />
          }
          center={this.state.locationPosition}
          markerDragHandler={this.markerDragHandler}
          markerDraggable
        />
        <div className={`form-group ${classes.wrapper}`}>
          <Button
            raised
            color="primary"
            disabled={onRequest}
            onClick={this.onSubmit}
          >
            Save
          </Button>
          {
            onRequest &&
            <CircularProgress size={24} className={classes.buttonProgress} />
          }
        </div>
      </div>
    );
  }
}

AddressMapContainer.propTypes = {
  saveData: PropTypes.func,
  classes: PropTypes.object,
  onRequest: PropTypes.bool
};

export default withStyles(styles)(AddressMapContainer);
