import { actionTypes } from '../constants';
import { GetDbAtOn} from '../../service';
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