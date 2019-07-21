import React, { Fragment, Component } from "react";
import {connect} from 'react-redux'
import {courseTeacher} from '../Utils/utils'
import axios from 'axios';


class CoursesList extends Component{

  state = {
    courses: []
  }

    addDescription = (e) =>{
      e.preventDefault()
        this.props.history.push('/editor')
    }

  componentDidMount(){
    const {teacherId} = this.props;
    const api = courseTeacher.replace('{teacherId}', 3);
    debugger
    axios.get(api)
        .then(response =>{
          debugger
            this.setState({courses: response.data})
        }).catch(err =>{

    })

  }

  render() {
    const {courses} = this.state;
    debugger
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
                          <button className="btn btn-lg btn-primary" onClick={this.addDescription}>
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
                     )
              })}
          </Fragment>
      );
  }
}

function mapStateToProps({teacher}) {
    return {
      teacherId: teacher.teacherId
    }
}

export default connect(mapStateToProps, null)(CoursesList);
