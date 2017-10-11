import database, { dbName } from '@App/utils/database';
import { getAddressList } from './getAddressList';

export const editAddress = ({ id, address }) => new Promise((done) => {
  const addressRef = database.ref(`${dbName}/${id}`);
  addressRef.update({
    ...address
  });
  done();
})
  .then(() => getAddressList());
