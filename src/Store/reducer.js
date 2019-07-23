import {combineReducers} from 'redux';

import {
    teacher_login,
    teacher_authenticated,
    select_course,
    add_courses
} from './constants';

const defaultTeacherState ={};

const teacherReducer = (state = defaultTeacherState, action) =>{
    switch (action.type){
        case teacher_login:
            return {...action.payload};
        case teacher_authenticated:
            const updatedState = {...state};
            if(updatedState){
                updatedState.isAuthenticated = action.payload;
            }
            return updatedState;
        default:
            return state;
    }
};

const defaultCourseState= {
    courses: [],
    selectedCourseId: []
};
const courseReducer = (state= defaultCourseState, action) =>{
    debugger;
    switch (action.type){
        case add_courses:
            state.courses.length = 0;
            return {...state, courses: action.payload};
        case select_course:
            return {...state, selectedCourseId: action.payload};
        default:
            return state;
    }
};


export default combineReducers({
    teacher:teacherReducer,
    courses: courseReducer
});
