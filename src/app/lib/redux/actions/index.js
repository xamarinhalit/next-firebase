import { actionTypes } from '../constants';
import { GetDbAtOn} from '../../service';
import { onAuthStateChanged } from '../../firestore';


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
  return { type: actionTypes.DATA_LIST_ADD, payload:payload };
}
export const DataList_Remove = (payload) => {
  return { type: actionTypes.DATA_LIST_REMOVE, payload:payload };
}
// export const DataList_Add_Success = (payload) => {
//   return { type: actionTypes.DATA_LIST_ADD_SUCCESS, payload:payload };
// }
export const On_Auth_State_Changed = (dispatch) => {
  onAuthStateChanged(u=>{
    dispatch({ type: actionTypes.ON_AUTH_STATE_CHANGED,payload:u });
  })
  
}