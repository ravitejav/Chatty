import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {authReducer} from '../redux/Auth/reducer';
import {dashboardReducer} from '../redux/Dashboard/reducer';

const basePersistConfig = {
  storage: AsyncStorage,
  throttle: 10,
};

const authConfig = {
  ...basePersistConfig,
  key: 'auth',
};

const dashboardConfig = {
  ...basePersistConfig,
  key: 'dashboard',
};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  dashboard: persistReducer(dashboardConfig, dashboardReducer),
});

export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);
