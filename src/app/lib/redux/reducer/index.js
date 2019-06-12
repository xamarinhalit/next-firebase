import { actionTypes} from '../constants';
import {InitialState} from '../state';
  // REDUCERS
  export const reducer = (state = InitialState, action) => {
    switch (action.type) {
      case actionTypes.FIREBASE_ONCE:
      if(action.IsServer)
        return Object.assign({}, state, {
          Result: action.Result,
        })
      case actionTypes.FIREBASE_ON:
      return Object.assign({}, state, {
        Result: action.Result,
      })
      case actionTypes.DATALIST_SELECTED:
      return Object.assign({}, state, {
        Selected: action.Selected,
      })
      case actionTypes.NAV_EXPANDED:
      return Object.assign({}, state, {
        isNavExpanded: action.isNavExpanded,
      })
      case actionTypes.AUTH_USER_LOGIN:
        return Object.assign({}, state, {
          User: action.User,
        })
      
      default:
        return state
    }
  }