import LoadDb,{GetDbUrl} from "../firestore";

import uuid from 'uuid';


export async function GetFirestore (){
  return await new Promise(async (resolve,reject)=>{
    try {
            let firebase =await LoadDb();
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
    return await new Promise(async (resolve,reject)=>{
      try {
      
        let firebase =await LoadDb();
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
  export const Data_List_Add =async (data)=>{
    let {name,detail,yurl,User}=data;
    if(name!=undefined && (detail!=undefined || yurl!=undefined) && User!=undefined && User!=null){
      return await new Promise(async (resolve,reject)=>{
        try {
          let saveDAta ={};
          let PostUser={};
          let firebase=await LoadDb();
          GetDbUrl("/next-db").then(url=>{
            if(url!=null){
              let ref=firebase.database().ref("/next-db");
              let refpost=firebase.database().ref("/next-postuser");
              let _uid=uuid();
              saveDAta = {
                  id:_uid,
                  name,detail,yurl,
                  picture: User.picture
                  };
                  PostUser= {
                    postid:saveDAta.id,
                    name:User.name,
                    email:User.email,
                    given_name:User.given_name,
                    picture: User.picture
                  };
                  ref.push().set(saveDAta);
                  refpost.push().set(PostUser);
                }
                resolve(true);
          }).catch(err=>{
            reject(null);
          });
         
          } catch (e) {
            reject(e);
          }
        });
    }
  }
  export const Data_List_Remove =async (data)=>{
    let {name,detail,yurl,User}=data;
    if(name!=undefined && (detail!=undefined || yurl!=undefined) && User!=undefined && User!=null){
      return await new Promise(async (resolve,reject)=>{
        try {
          let saveDAta ={};
          let PostUser={};
          let firebase=await LoadDb();
          let ref=firebase.database().ref("/next-db");
          let refpost=firebase.database().ref("/next-postuser");
          let _uid=uuid();
          saveDAta = {
              id:_uid,
              name,detail,yurl,
              };
              PostUser= {
                postid:saveDAta.id,
                name:User.name,
                email:User.email,
                given_name:User.given_name,
                picture: User.picture
              };
              ref.push().set(saveDAta);
              refpost.push().set(PostUser);
            
            resolve(null);
          } catch (e) {
            reject(e);
          }
        });
    }
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