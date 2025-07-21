import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import courseReducer from '../slices/courseSlice'

import cartReducer from '../slices/cartSlice'

// reducer function

const rootReducer = combineReducers({
auth:authReducer,
profile:profileReducer,
cart: cartReducer,
course:courseReducer
})

export default rootReducer;