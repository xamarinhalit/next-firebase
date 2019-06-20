import { actionTypes } from '../constants';
import { GetDbAtOn} from '../../service';
import { onAuthStateChanged } from '../../firestore';
import uuidv4 from 'uuid/v4';
import {Data_List_Add} from '../../service';
// ACTIONS
export const serverRenderOnce = (IsServer) => {
  if (IsServer) {
    let result = async () => await GetDatabase();
    return { type: actionTypes.FIREBASE_ONCE, IsServer: true, Result: result };
  }
  return { type: actionTypes.FIREBASE_ONCE, IsServer: false };
}
export const clientRenderOn = (dispatch) => {
   GetDbAtOn(cb=>{
    dispatch({ type: actionTypes.FIREBASE_ON, Result: cb });
  });
}

export const DataList_Selected = (selected) => {

  return { type: actionTypes.DATALIST_SELECTED, Selected: selected };
}
export const Nav_Expanded = (isNavExpanded) => {

  return { type: actionTypes.NAV_EXPANDED, isNavExpanded: isNavExpanded };
}
export const Auth_User_Login = (user) => {
  return { type: actionTypes.AUTH_USER_LOGIN, User: user };
}

export const Auth_User_Signout = (user) => {

  return { type: actionTypes.AUTH_USER_SIGNOUT, User: user };
}
export const Data_Filter = (payload) => {

  return { type: actionTypes.DATA_FILTER, payload };
}
export const DataList_Add = (payload) => {

  let data =Data_List_Add();
  console.log(data);
  return { type: actionTypes.DATA_LIST_ADD, payload:data };
}
export const On_Auth_State_Changed = (dispatch) => {
  onAuthStateChanged(u=>{
    console.log("IsAuth->> ",u);
    dispatch({ type: actionTypes.ON_AUTH_STATE_CHANGED,payload:u });
  })
  
}