import { combineReducers } from '@reduxjs/toolkit';
import auth from './Reducers/authSlice';

const rootReducer = combineReducers({
    auth
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer