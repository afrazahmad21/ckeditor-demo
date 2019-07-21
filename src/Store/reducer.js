import {teacher_login, teacher_authenticated} from './constants';

const defaultState ={
    teacher: {}
};

const teacherReducer = (state = defaultState, action) =>{
    switch (action.type){
        case teacher_login:
            return {...state, teacher: action.payload};
        case teacher_authenticated:
            const updatedState = {...state};
            if(updatedState.teacher){
                updatedState.teacher.isAuthenticated = action.payload
            }
            return updatedState;
        default:
            return state;
    }
};


export default teacherReducer;
