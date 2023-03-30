import { combineReducers ,AnyAction } from '@reduxjs/toolkit';
import auth from './Reducers/authSlice';
import notification from './Reducers/notificationSlice';

const appReducer = combineReducers({
    auth ,
    notification
})

const rootReducer = (state : any, action : AnyAction ) => {
    if (action.type === 'auth/logout') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action)
}


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer