import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { centerMarkerIcon } from '@Util/helpers';
import centerMarkerIconSrc from '@Asset/images/centerIcon.png';

class Map extends PureComponent {
  render() {
    const {
      onMapLoad,
      center,
      markerDragHandler
    } = this.props;

    return (
      <GoogleMap
        ref={onMapLoad}
        defaultZoom={14}
        defaultCenter={center}
        options={{
          gestureHandling: 'cooperative',
          streetViewControl: false,
          scrollwheel: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          rotateControl: false
        }}
      >
        {
          center &&
          <Marker
            position={center}
            onDragEnd={markerDragHandler}
            icon={centerMarkerIcon(centerMarkerIconSrc)}
            draggable
          />
        }
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  onMapLoad: PropTypes.func,
  markerDragHandler: PropTypes.func,
  center: PropTypes.object
};

export default withGoogleMap(Map);
