import admin from 'firebase-admin';
import  functions from 'firebase-functions';

export { functions };
export const firebase = admin.initializeApp();