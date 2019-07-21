import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'
// Logger with default options
import logger from "redux-logger";


export default function configureStore(defaultState) {
    return createStore(reducer, defaultState, applyMiddleware(logger, thunk))
}
