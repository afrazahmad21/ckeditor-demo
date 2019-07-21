import {teacher_login, teacher_authenticated} from './constants'

export const teacherLogin = (teacher) => dispatch =>{
    dispatch({type:teacher_login, payload: teacher})
}

export const teacherAuthenticated = (isAuthenticated) => dispatch =>{
    dispatch({type: teacher_authenticated, payload:isAuthenticated});
}
