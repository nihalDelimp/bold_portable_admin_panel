import { combineReducers } from '@reduxjs/toolkit';
import auth from './Reducers/authSlice';
import notification from './Reducers/notificationSlice';

const rootReducer = combineReducers({
    auth ,
    notification
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer