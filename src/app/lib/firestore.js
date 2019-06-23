
import firebase from 'firebase/app';

export const GetDbUrl=async (path)=>{
  return new Promise((resolve,reject)=>{
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_SENDER_ID,
    };
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      if(idToken!=null && idToken!=undefined){
        let url =config.databaseURL+"?access_token="+idToken;
        
        resolve(url);
      }
      else{
        reject(null);
      }
    }).catch(function(error) {
      reject(null);
    });
  });
  
}

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
  if(firebase.app.length!=undefined && firebase.app.length>0){
    await firebase.initializeApp(config);
  }
} catch (e) {
  
}
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
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  try {
    return firebase.auth().signInWithPopup(provider);
  } catch (error) {
    LoadDb();
    return firebase.auth().signInWithPopup(provider);
  }
  
  
}

export const onAuthStateChanged = (cb)=>{
  try {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          cb(true);
        }else{
          cb(false);
        }
      });
    
  } catch (error) {
    LoadDb();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        cb(true);
      }else{
        cb(false);
      }
    });
  }
  
}
