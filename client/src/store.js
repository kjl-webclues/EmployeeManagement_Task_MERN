import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import userReducer from "./Reducer/userReducer";

const composeEnhancers = window._REDUX_DEVTOOLS_CIMPOSE_ || compose;

const store = createStore(
    userReducer,
    composeEnhancers(applyMiddleware(thunk)));

export default store

