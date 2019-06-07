import LoadDb from "../firestore";
import uuid from 'uuid';


export  function GetFirestore (){
    // let firebase =await LoadDb();
    return  new Promise(async (resolve,reject)=>{
      try {
            firebase.firestore().collection("next-db")
            .get()
            .then((snapshot)=>{
                let data= [];
                  snapshot.forEach(doc=>{
                    data.push(
                      Object.assign({
                        id:uuid()
                      },doc.data())
                    );
                  });
                  resolve(data);
              }
              )
        } catch (e) {
          reject({ data:undefined});
        }
    });
  }
const firebase = LoadDb();
  export  function GetDatabase (){
    return new Promise(async (resolve,reject)=>{
      try {
        firebase.database().ref("/next-db").once('value', function(snapshot) {
              let data= [];
              let _key=0;
              snapshot.forEach(snap=>{
                _key++;
                data.push({
                  ...snap.val(),
                  //id:uuid()
                  id:_key
                })
              });
              resolve(data);
            });
        } catch (e) {
          reject({ data:null});
        }
    });
  }
  export function GetDbAtOn(cb)
  {
    // let firebase =await LoadDb();
    return new Promise(async (resolve,reject)=>{
    try {
      firebase.database().ref("/next-db").on('value', function(snapshot) {
            let data= [];
            let _key=0;
            snapshot.forEach(snap=>{
              _key++;
              data.push({
                ...snap.val(),
                //id:uuid()
                id:_key
              })
            });
            cb(data);
            resolve(data);
          });
      } catch (e) {
            reject({ data:null});
    }
    });
  }