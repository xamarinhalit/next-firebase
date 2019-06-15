
import firebase from 'firebase/app';
//import 'firebase/firestore';
export  default async function LoadDb() {

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
};
try {
  if(firebase.app.length!=undefined && firebase.app.length>0)
  await firebase.initializeApp(config);
} catch (e) {
  
}
// if (!firebase.apps.length) {
// }
return firebase;
}

export const AuthLogout = ()=>{
  try {
    return firebase.auth().signOut();  
  } catch (e) {
    LoadDb();
    return firebase.auth().signOut();  
  }
  
}
//import 'firebase/auth';
export const AuthLogin = ()=>{
  LoadDb();
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  // firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   // ...
  //   console.log(result);
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  //   console.log(error);
    
  // });
  return firebase.auth().signInWithPopup(provider);
}