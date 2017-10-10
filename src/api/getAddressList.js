import database, { dbName } from '@App/utils/database';

export const getAddressList = () => new Promise((done) => {
  database.ref(dbName).once('value', (snap) => {
    const keys = Object.keys(snap.val());
    const data = keys.map(key => ({ ...snap.val()[key], id: key }));

    done(data);
  });
});
