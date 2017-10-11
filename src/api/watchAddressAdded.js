import database, { dbName } from '@App/utils/database';

export const watchAddressAdded = (dispatch, addressAddedAction) => {
  database.ref(dbName).on('child_added', (snap) => {
    const data = snap.val();
    const id = snap.key;
    dispatch(addressAddedAction({ ...data, id }));
  });
};
