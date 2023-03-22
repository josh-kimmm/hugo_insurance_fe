// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// This is how you import a reducer, based on the prior export.
import * as reducers from "./reducers";

const appReducer = combineReducers(reducers);

const store = configureStore({
  reducer: appReducer,
});

export default store;