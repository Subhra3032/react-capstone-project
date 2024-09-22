import { createStore } from 'redux';
import { userReducer } from './userReducer';

// Create the redux store
const store = createStore(userReducer);

export default store;