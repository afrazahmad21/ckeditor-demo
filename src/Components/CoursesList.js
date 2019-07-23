import React, { Fragment, Component } from "react";
import {connect} from 'react-redux';
import {courseTeacher} from '../Utils/utils';
import {selectCourse, addCourses} from '../Store/action';
import axios from 'axios';


class CoursesList extends Component{

  state = {
    courses: []
  };

    addDescription = (e, index) =>{
        e.preventDefault();
        this.props.selectCourse(index);
        this.props.history.push('/editor');
    };

  componentDidMount(){
    const {teacherId} = this.props;
    // TODO: REMOVE TEACHER ID HARDCODED
    const api = courseTeacher.replace('{teacherId}', 3);
    axios.get(api)
        .then(response =>{
            const courses = response.data;
            this.props.addCourses(courses);
            this.setState({courses});
        }).catch(err =>{

    });

  }

  render() {
    const {courses} = this.state;

      return (
          <Fragment>
              <section className="banner1">
                  <header>
                      <nav className="navbar navbar-expand-lg navbar-light">
                          <div className="container">
                              <a className="navbar-main" href="index.html">
                                  <img src="/images/logo.png"/>
                                  <small>
                                      <sub>- Courses List</sub>
                                  </small>
                              </a>
                          </div>
                      </nav>
                  </header>
              </section>
              {courses.map((course, index) =>{
                 return (
                  <section className="welcome py-md-2">
                      <div className="container ">
                      <div className="item">
                      <div className="clearfix col-md-12">
                      <div className="hd-1 pull-left">
                      <h2>{course.courseName}</h2>
              </div>
                  <div className="hd-2 pull-right">
                      <h3>Auther Name</h3>
                    <p>{course.teacher.teacherName}</p>
                  </div>
              </div>

                  <div className="main col-md-12">
                      <p>
                          {course.courseDetails}
                      </p>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <button className="btn btn-lg btn-primary" onClick={e =>this.addDescription(e, index)}>
                              <i className="fa fa-plus"/> Add Description
                          </button>
                        </div>
                          <div className="col-md-6">
                              <button className="btn btn-lg btn-primary">
                                  <i className="fa fa-file-alt"/> Lecture Notes
                              </button>
                          </div>
                        </div>
                      </div>

                  </div>
              </section>
                     );
              })}
          </Fragment>
      );
  }
}

function mapStateToProps({teacher}) {
    return {
      teacherId: teacher.teacherId
    };
}

const mapReducerToProps = {
    selectCourse,
    addCourses
};

export default connect(mapStateToProps, mapReducerToProps)(CoursesList);
