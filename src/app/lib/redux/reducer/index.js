import { combineReducers } from 'redux';

import { reducer as blog } from './_blog';
import { reducer as payment } from './_payment';


export default combineReducers({
    blog: blog,
    payment: payment
});
