import LoadDb from "../firestore";
import uuid from 'uuid';



export async function GetFirestore (){
    let firebase =await LoadDb();
    return await new Promise(async (resolve,reject)=>{
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
  export async function GetDatabase (){
    let firebase =await LoadDb();
    return await new Promise(async (resolve,reject)=>{
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
          reject({ data:[]});
        }
    });
  }
  export const Data_List_Add =async ()=>{
   
    let firebase =await LoadDb();
    return await new Promise((resolve,reject)=>{
      try {
        var postData ={};
        var ref=firebase.database().ref("/next-db");
        let _uid=uuid();
        postData = {
              id:_uid,
              name: "halit3"
            };
            // Get a key for a new Post.
              
          resolve(ref.push().set(postData));
        } catch (e) {
              reject(e);
      }
      });
  }
  export async function GetDbAtOn(cb)
  {
    let firebase =await LoadDb();
    return await new Promise(async (resolve,reject)=>{
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
            reject({ data:[]});
    }
    });
  }