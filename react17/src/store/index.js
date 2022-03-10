import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter.js';
import userReducer from "./user.js";

export default configureStore({
    reducer: {
      counter: counterReducer,
      user: userReducer
    },
})