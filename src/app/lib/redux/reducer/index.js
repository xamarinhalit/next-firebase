import { actionTypes} from '../constants';
import {InitialState} from '../state';

  // REDUCERS
  export const reducer = (state = InitialState, action) => {
    switch (action.type) {
      case actionTypes.FIREBASE_ONCE:
      if(action.IsServer)
        return Object.assign({}, state, {
          Result: action.Result,
          OldResult:action.Result,
        })
      case actionTypes.FIREBASE_ON:
      return Object.assign({}, state, {
        Result: action.Result,
        OldResult:action.Result,
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
        case actionTypes.AUTH_USER_SIGNOUT:
        return Object.assign({}, state, {
          User: state.DefaultUser
        })
        case actionTypes.DATA_LIST_ADD:
       
        // state.Result.push({
        //   name:"deneme"+state.Result.length,
        //   id:state.Result.length+1
        // });
        return Object.assign({}, state, {
            ...state,
            data:{...action.payload}
        })
        case actionTypes.ON_AUTH_STATE_CHANGED:
        return Object.assign({}, state, {
         IsAuth:action.payload
        })
        case actionTypes.DATA_FILTER:
        if(action.payload.path=="/about"){
          let rs= state.OldMapList.filter(function(val){return val.name.includes(action.payload.data)});
          return Object.assign({}, state, {
            MapList:rs,
          })
        }else{
          let rs= state.OldResult.filter(function(val){return val.name.includes(action.payload.data)});
          return Object.assign({}, state, {
            Result:rs,
          })
        }
        
      default:
        return state
    }
  }