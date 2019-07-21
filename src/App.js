import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './Components/Login'
import Verify from './Components/Verify'
import CoursesList from './Components/CoursesList'
import Editor from './Components/Editor'
import MyCalendar from './Components/Calender'
import configureStore from "./Store";
import $ from 'jquery';
import { Provider } from "react-redux";
import ProtectedRoute from './HOC/protectedRoutes';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

require('bootstrap/dist/css/bootstrap.min.css');
require('./css/style.css');
require('font-awesome/css/font-awesome.min.css');
require('popper.js/dist/popper.min')
require('bootstrap/dist/js/bootstrap.min');
require('easing-js/easing')
require('react-big-calendar/lib/css/react-big-calendar.css');
require('react-big-calendar/lib/addons/dragAndDrop');

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);


const App = () =>(
    <Provider store={reduxStore}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/verify" component={Verify} />
                <ProtectedRoute exact path="/courses" component={CoursesList} />
                <ProtectedRoute exact path="/editor" component={Editor} />
                <ProtectedRoute exact path="/calender" component={MyCalendar} />
            </Switch>

        </BrowserRouter>
    </Provider>
)

export default App
