import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger'
import rootReducer, { RootState } from './rootReducer';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";


const persistConfig = {
  key: "bold",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export type AppStore = ReturnType<typeof store.getState>

export default store

export const persistor = persistStore(store);
