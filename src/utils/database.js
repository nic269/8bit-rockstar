import firebase from 'firebase';
import { GG_FIRE_BASE_INFO } from './constants';

firebase.initializeApp(GG_FIRE_BASE_INFO);
const database = firebase.database();

export default database;

export const dbName = 'data';
