import { actionTypes } from '../constants';
import { InitialState } from '../state';
import { Data_List_Add, Data_List_Remove } from '../../service';



// REDUCERS
export const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionTypes.FIREBASE_ONCE:
            if (action.IsServer)
                return Object.assign({}, state, {
                    Result: action.Result,
                    OldResult: action.Result,
                })
        case actionTypes.FIREBASE_ON:
            return Object.assign({}, state, {
                Result: action.Result,
                OldResult: action.Result,
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
        case actionTypes.DATA_LIST_REMOVE:
            if (state.IsAuth && state.User.email != undefined && state.User.email != null) {
                try {
                    Data_List_Remove({ User: { ...state.User }, postid: action.payload }).then(() => {
                        console.log(action.payload + "  silindi..");
                    }).catch(() => {
                        console.log(action.payload + "  silinemedi..");
                    });
                } catch (error) {
                }
            }
            return state;
        case actionTypes.DATA_LIST_ADD:
            if (state.IsAuth && state.User.email != undefined && state.User.email != null) {
                try {
                    Data_List_Add({ ...action.payload, User: { ...state.User } }).then(data => {
                        // reducer(state, { type: actionTypes.DATA_LIST_ADD_SUCCESS, payload:true })
                    }).catch(e => {
                        //reducer(state, { type: actionTypes.DATA_LIST_ADD_SUCCESS, payload:false })
                    });

                } catch (error) {
                    //reducer(state, { type: actionTypes.DATA_LIST_ADD_SUCCESS, payload:false })
                }
            }

            return Object.assign({}, state);

        case actionTypes.ON_AUTH_STATE_CHANGED:
            return Object.assign({}, state, {
                IsAuth: action.payload
            })
        case actionTypes.DATA_FILTER:
            if (action.payload.path == "/about") {
                let rs = state.OldMapList.filter(function (val) { return val.name.includes(action.payload.data) });
                return Object.assign({}, state, {
                    MapList: rs,
                })
            } else {
                let rs = state.OldResult.filter(function (val) { return val.name.includes(action.payload.data) });
                return Object.assign({}, state, {
                    Result: rs,
                })
            }

        default:
            return state
    }
}
