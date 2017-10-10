import database, { dbName } from '@App/utils/database';

export const addAddress = address => new Promise((done) => {
  const addressRef = database.ref(dbName);
  addressRef.push(address);
  done();
});
