import React, { PureComponent } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
} from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJaUcsRuhSjN5etNdPkLvSeOnq3w0g4aI&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });

          console.log(this.props);
          this.props.setData(places);
        },
      });
    },
  }),
  withScriptjs  
)(props =>
  (<div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
        }}
      />
    </StandaloneSearchBox>
    <ol>
      {
        props.places.map(({
          place_id: placeId,
          formatted_address: formattedAddress,
          geometry: { location }
        }) =>
          (<li key={placeId}>
            {formattedAddress}
            {' at '}
            ({location.lat()}, {location.lng()})
          </li>)
        )
      }
    </ol>
  </div>)
);

class AddressListMap extends PureComponent {
  setData = (data) => {
    this.a();
    console.log(this.placeToAddress(data[0].address_components));
    // data.map(({
    //   place_id: placeId,
    //   formatted_address: formattedAddress,
    //   geometry: { location }
    // }) => console.log({ placeId, formattedAddress, location }));
  }

  a = () => {
    console.log(this.props);
  }

  placeToAddress = (addressComponents) => {
    const address = {};
    addressComponents.forEach((c) => {
      switch (c.types[0]) {
        // case 'street_number':
        //   address.streetNumber = c;
        //   break;
        case 'route':
          address.street = c.long_name;
          break;
        case 'sublocality_level_1': case 'sublocality':
          address.ward = c.long_name;
          break;
        case 'administrative_area_level_2':
          address.district = c.long_name;
          break;
        case 'neighborhood': case 'locality': case 'administrative_area_level_1':
          address.city = c.long_name;
          break;
        // case 'postal_code':
        //   address.zip = c.long_name;
        //   break;
        case 'country':
          address.country = c.long_name;
          break;
        default:
          break;
      }
    });

    return address;
  }

  render() {
    return (
      <PlacesWithStandaloneSearchBox setData={this.setData} />
    );
  }
}

export default AddressListMap;
