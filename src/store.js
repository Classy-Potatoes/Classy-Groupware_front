import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import rootReducer from "./common/modules";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger))
);

export default store;