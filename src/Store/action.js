import {
    teacher_login,
    teacher_authenticated,
    select_course,
    add_courses
} from './constants';

export const teacherLogin = (teacher) => dispatch =>{
    dispatch({type:teacher_login, payload: teacher});
};

export const teacherAuthenticated = (isAuthenticated) => dispatch =>{
    dispatch({type: teacher_authenticated, payload:isAuthenticated});
};

export const selectCourse = (courseId) => dispatch =>{
    dispatch({type: select_course, payload: courseId});
};

export const addCourses = (courses) => dispatch =>{
    dispatch({type: add_courses, payload: courses});
};
