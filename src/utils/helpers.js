const getTypes = (type, statuses = ['REQUEST', 'SUCCESS', 'FAILURE']) => statuses.map(item => type[item]);

export const thunkHandler = ({ api, params = {}, type = {} }) => (dispatch) => {
  const types = getTypes(type);
  if (types.length !== 3) {
    console.error('ERROR: types are not match'); // eslint-disable-line
  } else {
    dispatch(({
      type: types[0]
    }));
    return api({ ...params })
      .then(data => dispatch(({
        type: types[1],
        data
      })))
      .catch(error => dispatch(({
        type: types[2],
        error
      })));
  }
};

export const centerMarkerIcon = centerMarkerIconSrc => ({
  url: centerMarkerIconSrc,
  size: new google.maps.Size(30, 44),
  scaledSize: new google.maps.Size(30, 44)
});
